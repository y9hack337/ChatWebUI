$(document).ready(function() {
    let currentChatId = null;
    const $messageList = $('#message-list');
    const $messageInput = $('#message-input');
    const $sendButton = $('#send-button');
    const $chatList = $('#chat-list');
    const $loadingIndicator = $('#loading-indicator');
    const $chatError = $('#chat-error');
    const $inputError = $('#input-error');
    const $noChatSelected = $('#no-chat-selected');

    // --- Initialization ---
    function initializeChat() {
        const token = getToken();
        if (!token) {
            console.log("No token found, redirecting to login.");
            window.location.href = '/login';
            return;
        }
        console.log("Token found, initializing chat.");
        loadChatList(); // Load list first
        setupEventListeners();
        configureMarked();

        // Check hash *after* loading list potentially
        handleInitialHash();
    }

    function handleInitialHash() {
        if (window.location.hash && window.location.hash.startsWith('#')) {
            const chatIdFromHash = window.location.hash.substring(1);
            // Ensure chat ID is valid before loading
            const isValidId = $chatList.find(`[data-chat-id="${chatIdFromHash}"]`).length > 0;
            if (!isNaN(chatIdFromHash) && isValidId) {
                loadChatMessages(parseInt(chatIdFromHash, 10));
            } else if (!isNaN(chatIdFromHash) && !isValidId) {
                console.warn(`Chat ID ${chatIdFromHash} from hash not found in list. Removing hash.`);
                window.location.hash = ''; // Clear invalid hash
                $noChatSelected.show();
                currentChatId = null;
                updateChatListSelection(null); // Deselect any active item
            }
            else {
                console.log("No valid chat ID in hash.");
                $noChatSelected.show();
                currentChatId = null;
            }
        } else {
            console.log("No hash found on load.");
            $noChatSelected.show();
            currentChatId = null;
        }
    }

    function configureMarked() {
        // Optional: Customize Marked if needed
    }

    // --- Authentication ---
    function getToken() {
        return localStorage.getItem('jwtToken');
    }

    function getAuthHeader() {
        const token = getToken();
        return token ? { 'Authorization': 'Bearer ' + token } : {};
    }

    function handleAjaxError(jqXHR, context) {
        console.error(`AJAX Error (${context}):`, jqXHR.status, jqXHR.statusText, jqXHR.responseText);
        if (jqXHR.status === 401 || jqXHR.status === 403) {
            console.log("Unauthorized or Forbidden access. Logging out.");
            logout();
        } else {
            showChatError(`An error occurred (${context}). Status: ${jqXHR.status}. Please try again later.`);
        }
    }

    // --- UI Updates ---
    function showLoading(show) {
        if (show) {
            $loadingIndicator.removeClass('d-none');
        } else {
            $loadingIndicator.addClass('d-none');
        }
    }

    function showChatError(message) {
        $chatError.text(message).removeClass('d-none');
        setTimeout(() => $chatError.addClass('d-none'), 5000);
    }

    function showInputError(message) {
        $inputError.text(message).removeClass('d-none');
        setTimeout(() => $inputError.addClass('d-none'), 3000);
    }

    function scrollToBottom() {
        const chatWindow = document.getElementById('chat-window');
        if (chatWindow) {
            setTimeout(() => {
                chatWindow.scrollTop = chatWindow.scrollHeight;
            }, 50);
        }
    }

    function renderMarkdown(content) {
        if (typeof marked === 'undefined') {
            console.error("Marked library is not loaded!");
            return content;
        }
        try {
            return marked.parse(content || ''); // Ensure content is not null/undefined
        } catch (e) {
            console.error("Marked parsing error:", e);
            return content; // Return original content on error
        }
    }

    function highlightCodeInElement(element) {
        if (typeof hljs === 'undefined') {
            console.error("Highlight.js library is not loaded!");
            return;
        }
        $(element).find('pre code').each(function(i, block) {
            try {
                hljs.highlightElement(block);
            } catch (e) {
                console.error("Highlight.js error:", e);
            }
        });
    }

    // --- Chat List Handling ---
    function loadChatList() {
        console.log("Loading chat list...");
        return $.ajax({ // Return the promise
            url: '/api/chats',
            method: 'GET',
            headers: getAuthHeader(),
            success: function(chats) {
                console.log("Chats received:", chats);
                $chatList.empty();
                if (chats && chats.length > 0) {
                    // Sort chats by creation date, newest first (optional but good UX)
                    chats.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    chats.forEach(chat => {
                        const chatItem = `
                            <a href="#${chat.id}" data-chat-id="${chat.id}" class="list-group-item list-group-item-action bg-dark text-light border-secondary animate__animated animate__fadeInUp chat-list-item">
                                Chat ${chat.id}
                                <small class="d-block text-muted">${formatTimestamp(chat.createdAt, true)}</small>
                            </a>`;
                        $chatList.append(chatItem);
                    });
                    // Re-apply active class if currentChatId is set and exists in the list
                    if (currentChatId) {
                        updateChatListSelection(currentChatId);
                    }
                } else {
                    $chatList.append('<p class="text-muted p-2">No chats yet.</p>');
                    currentChatId = null; // Ensure no chat is selected if list is empty
                    $noChatSelected.show(); // Show placeholder if no chats exist
                }
            },
            error: function(jqXHR) {
                handleAjaxError(jqXHR, "loading chat list");
                $chatList.append('<p class="text-danger p-2">Error loading chats.</p>');
                currentChatId = null;
                $noChatSelected.show();
            }
        });
    }

    // --- Message Handling ---
    function loadChatMessages(chatId) {
        if (!chatId || isNaN(chatId)) {
            console.error("loadChatMessages called with invalid chatId:", chatId);
            $noChatSelected.show();
            $messageList.empty();
            updateChatListSelection(null);
            if (window.location.hash) window.location.hash = ''; // Clear invalid hash
            return;
        }
        console.log(`Loading messages for chat ${chatId}`);

        // Avoid unnecessary reload if already viewing the chat
        // if (currentChatId === chatId && $messageList.children().length > 0 && !$noChatSelected.is(':visible')) {
        //     console.log(`Chat ${chatId} already loaded.`);
        //     updateChatListSelection(chatId); // Ensure selection is correct
        //     window.location.hash = chatId; // Ensure hash is correct
        //     return;
        // }

        currentChatId = chatId;
        $messageList.empty();
        $noChatSelected.hide();
        showLoading(true);
        $chatError.addClass('d-none');
        updateChatListSelection(chatId);
        window.location.hash = chatId; // Set hash when loading

        $.ajax({
            url: `/api/chats/${chatId}/messages`,
            method: 'GET',
            headers: getAuthHeader(),
            success: function(messages) {
                console.log(`Messages for chat ${chatId}:`, messages);
                $messageList.empty(); // Clear again just in case
                if (messages && messages.length > 0) {
                    messages.forEach(msg => {
                        const $el = displayMessage(msg);
                        // Add classes for edit/regenerate based on final message data
                        if (msg.role === 'USER' && msg.id) {
                            $el.addClass('can-edit');
                            $el.data('original-content', msg.content); // Store original content
                            $el.find('.edit-textarea').val(msg.content);
                        } else if (msg.role === 'ASSISTANT' && msg.id) {
                            $el.addClass('can-regenerate');
                            // Ensure button has correct IDs
                            $el.find('.regenerate-button')
                                .attr('data-chat-id', msg.chatId || chatId)
                                .attr('data-message-id', msg.id);
                        }
                    });
                } else {
                    $messageList.append('<p class="text-muted text-center mt-3">No messages in this chat yet. Send one!</p>');
                }
                scrollToBottom();
                showLoading(false);
            },
            error: function(jqXHR) {
                handleAjaxError(jqXHR, `loading messages for chat ${chatId}`);
                showLoading(false);
                showChatError(`Error loading messages for chat ${chatId}.`);
                $messageList.empty().append('<p class="text-danger text-center mt-3">Could not load messages.</p>');
                // Optional: Reset currentChatId if loading fails?
                // currentChatId = null;
                // updateChatListSelection(null);
                // window.location.hash = '';
                // $noChatSelected.show();
            }
        });
    }

    function displayMessage(message) {
        const roleClass = message.role ? message.role.toLowerCase() : 'unknown';
        const formattedTimestamp = message.timestamp ? formatTimestamp(message.timestamp) : '';
        const renderedContent = renderMarkdown(message.content || '');
        const isUserMessage = roleClass === 'user';
        const messageId = message.id;
        const elementId = messageId ? `message-${messageId}` : `optimistic-${Date.now()}-${Math.random().toString(36).substring(7)}`;
        const chatIdForActions = message.chatId || currentChatId; // Use message's chatId if available, else current

        const editControlsHtml = `
            <div class="edit-controls">
                <button class="btn btn-sm btn-outline-secondary edit-button" title="Edit message">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                    </svg>
                </button>
            </div>
            <div class="edit-area d-none">
                <textarea class="form-control form-control-sm mb-1 edit-textarea"></textarea>
                <button class="btn btn-sm btn-success save-edit-button me-1">Save</button>
                <button class="btn btn-sm btn-secondary cancel-edit-button">Cancel</button>
                <div class="edit-error text-danger small mt-1 d-none"></div>
            </div>
        `;

        const regenerateButtonHtml = `
            <div class="action-buttons">
                <button class="btn btn-sm btn-outline-secondary regenerate-button" data-chat-id="${chatIdForActions || ''}" data-message-id="${messageId || ''}" title="Regenerate response">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                    </svg>
                </button>
            </div>`;

        const messageHtml = `
            <div id="${elementId}" class="message-item ${roleClass} animate__animated animate__fadeInUp"
                 ${messageId ? `data-message-id="${messageId}"` : ''}
                 data-chat-id="${chatIdForActions || ''}">
                <div class="message-content">${renderedContent}</div>
                 <div class="message-footer d-flex justify-content-between align-items-center">
                    ${isUserMessage ? editControlsHtml : regenerateButtonHtml}
                    <span class="timestamp ms-auto">${formattedTimestamp}</span>
                 </div>
                 ${isUserMessage ? `<div class="edit-area d-none">...</div>` : ''} <!-- Placeholder for edit area structure if needed -->
            </div>
        `;

        const $messageElement = $(messageHtml);

        // If it's a user message, set the textarea value and store original content
        if (isUserMessage) {
            const $editArea = $messageElement.find('.edit-area'); // Find the correct edit area
            $editArea.find('.edit-textarea').val(message.content || ''); // Set textarea value
            $messageElement.data('original-content', message.content || ''); // Store original content data attribute
            // Ensure edit controls are properly associated if needed later
            $messageElement.find('.message-footer').prepend($editArea.siblings('.edit-controls'));
            $messageElement.append($editArea); // Make sure edit area is inside the message item
        }

        $messageList.append($messageElement);
        highlightCodeInElement($messageElement);
        return $messageElement;
    }

    function showEditMode($messageItem, show = true) {
        const $contentDiv = $messageItem.find('.message-content');
        const $editArea = $messageItem.find('.edit-area'); // Find the edit area correctly
        const $editControls = $messageItem.find('.edit-controls'); // Find controls
        const $footer = $messageItem.find('.message-footer'); // The footer container

        if (show) {
            const originalText = $messageItem.data('original-content');
            $editArea.find('.edit-textarea').val(originalText); // Set textarea value
            $editArea.find('.edit-error').text('').addClass('d-none'); // Clear errors
            $contentDiv.addClass('d-none'); // Hide original content
            $editControls.addClass('d-none'); // Hide edit icon
            $footer.addClass('d-none'); // Hide timestamp/buttons temporarily
            $editArea.removeClass('d-none'); // Show edit form
            $messageItem.addClass('editing');
            $editArea.find('.edit-textarea').focus(); // Focus textarea
        } else {
            $contentDiv.removeClass('d-none'); // Show content
            $editArea.addClass('d-none'); // Hide edit form
            $editControls.removeClass('d-none'); // Show edit icon
            $footer.removeClass('d-none'); // Show footer again
            $messageItem.removeClass('editing');
        }
    }

    function saveMessageEdit(button) {
        const $button = $(button);
        const $messageItem = $button.closest('.message-item');
        const messageId = $messageItem.data('message-id');

        if (!messageId) {
            console.error("Attempted to save edit without a valid message ID.", $messageItem);
            $messageItem.find('.edit-error').text('Error: Cannot save, message ID missing.').removeClass('d-none');
            return;
        }

        const $editArea = $button.closest('.edit-area');
        const $contentDiv = $messageItem.find('.message-content');
        const $errorDiv = $editArea.find('.edit-error');
        const chatId = $messageItem.data('chat-id');
        const newContent = $editArea.find('.edit-textarea').val().trim();

        if (!newContent) {
            $errorDiv.text('Message cannot be empty.').removeClass('d-none');
            return;
        }
        if (!chatId) {
            $errorDiv.text('Chat ID is missing.').removeClass('d-none');
            return;
        }

        $errorDiv.text('').addClass('d-none');
        $button.prop('disabled', true).html('<span class="spinner-border spinner-border-sm"></span> Saving...');
        $button.siblings('button').prop('disabled', true); // Disable cancel too

        $.ajax({
            url: `/api/chats/${chatId}/messages/${messageId}`,
            method: 'PUT',
            headers: getAuthHeader(),
            contentType: 'application/json',
            data: JSON.stringify({ content: newContent }),
            success: function(updatedMessage) {
                console.log("Message edit successful:", updatedMessage);
                const newRenderedContent = renderMarkdown(updatedMessage.content || '');
                $contentDiv.html(newRenderedContent);
                highlightCodeInElement($contentDiv);
                $messageItem.data('original-content', updatedMessage.content); // Update stored original content

                const $timestampSpan = $messageItem.find('.timestamp');
                if ($timestampSpan.length) {
                    $timestampSpan.text(formatTimestamp(updatedMessage.timestamp));
                }

                showEditMode($messageItem, false); // Hide edit mode
                // Buttons are re-enabled by showEditMode implicitly showing controls again
                scrollToBottom();
            },
            error: function(jqXHR) {
                handleAjaxError(jqXHR, `saving edit for message ${messageId}`);
                $errorDiv.text('Failed to save edit. Please try again.').removeClass('d-none');
                $button.prop('disabled', false).text('Save');
                $button.siblings('button').prop('disabled', false); // Re-enable cancel
            },
            complete: function() {
                // Ensure buttons are re-enabled even if showEditMode had issues
                $button.prop('disabled', false).html('Save');
                $button.siblings('button').prop('disabled', false);
            }
        });
    }

    // Refactored function to handle the actual message sending AJAX call
    function sendActualMessage(chatId, content) {
        console.log(`Sending actual message to chat ${chatId}: ${content}`);

        // Display optimistic user message
        const optimisticUserMessage = {
            chatId: chatId,
            role: 'USER',
            content: content,
            timestamp: new Date().toISOString() // Use current time optimistically
        };
        const $optimisticElement = displayMessage(optimisticUserMessage);
        scrollToBottom(); // Scroll after showing optimistic message

        // Clear input and update button state AFTER optimistic display
        $messageInput.val('');
        $sendButton.prop('disabled', true).html('<span class="spinner-border spinner-border-sm"></span>');
        $messageInput.prop('disabled', false); // Re-enable input for next message

        $.ajax({
            url: `/api/chats/${chatId}/messages`,
            method: 'POST',
            headers: getAuthHeader(),
            contentType: 'application/json',
            data: JSON.stringify({ content: content }),
            success: function(response) {
                console.log("Send/Response successful:", response);

                // Update optimistic message with real data
                if ($optimisticElement.length && response.userMessage && response.userMessage.id) {
                    console.log(`Updating optimistic message element ${$optimisticElement.attr('id')} with real ID: ${response.userMessage.id}`);
                    const realId = response.userMessage.id;
                    $optimisticElement.attr('id', `message-${realId}`);
                    $optimisticElement.attr('data-message-id', realId);
                    $optimisticElement.data('message-id', realId); // Update jQuery data too
                    $optimisticElement.addClass('can-edit');
                    $optimisticElement.data('original-content', response.userMessage.content); // Store content
                    $optimisticElement.find('.edit-textarea').val(response.userMessage.content); // Update edit textarea

                    // Update timestamp if available in response
                    const $timestampSpan = $optimisticElement.find('.timestamp');
                    if ($timestampSpan.length && response.userMessage.timestamp) {
                        $timestampSpan.text(formatTimestamp(response.userMessage.timestamp));
                    }
                    // Ensure edit controls are present and have correct IDs (though optimistic doesn't strictly need them yet)
                    const $editControls = $optimisticElement.find('.edit-controls');
                    if ($editControls.length === 0 && $optimisticElement.hasClass('user')) {
                        // Inject controls if missing - might happen if initial displayMessage was simplified
                        // Re-running display might be safer, but this patches it:
                        const controlsHtml = `...`; // copy from displayMessage
                        $optimisticElement.find('.message-footer').prepend(controlsHtml);
                    }

                } else {
                    console.warn("Could not find optimistic message element or userMessage ID in response. Removing optimistic message.");
                    $optimisticElement.remove(); // Remove broken optimistic message
                    // Optionally display the confirmed message if possible
                    if (response.userMessage) {
                        displayMessage(response.userMessage).addClass('can-edit');
                    } else {
                        showChatError("Error updating your sent message. Please refresh.");
                    }
                }

                // Display assistant message
                if (response.assistantMessage && response.assistantMessage.id) {
                    const $assistantElement = displayMessage(response.assistantMessage);
                    $assistantElement.addClass('can-regenerate');
                    // Ensure button IDs are correct (displayMessage should handle this now)
                    $assistantElement.find('.regenerate-button')
                        .attr('data-chat-id', response.assistantMessage.chatId || chatId)
                        .attr('data-message-id', response.assistantMessage.id);
                } else {
                    console.error("Assistant message missing ID or missing entirely from response.");
                    showChatError("Assistant response was not received correctly.");
                }

                scrollToBottom(); // Scroll again after assistant message
            },
            error: function(jqXHR) {
                handleAjaxError(jqXHR, `sending message to chat ${chatId}`);
                showInputError("Failed to send message.");
                // Mark optimistic message as failed
                if ($optimisticElement.length) {
                    $optimisticElement.addClass('message-error');
                    $optimisticElement.find('.message-content').append(' <span class="text-danger small fw-bold">(Failed)</span>');
                    // Maybe disable edit on failed message
                    $optimisticElement.find('.edit-controls').remove();
                    $optimisticElement.removeClass('can-edit');
                }
            },
            complete: function() {
                // Always re-enable the send button
                $sendButton.prop('disabled', false).text('Send');
                $messageInput.prop('disabled', false); // Ensure input is enabled
            }
        });
    }

    // Function to handle the overall send action
    function sendMessage() {
        const content = $messageInput.val().trim();
        if (!content) {
            showInputError('Please enter a message.');
            return;
        }

        // --- NEW LOGIC ---
        if (!currentChatId) {
            console.log("No chat selected. Creating a new chat first...");
            createNewChatAndSendMessage(content); // Call the function to create chat then send
        } else {
            // --- EXISTING LOGIC ---
            // Directly call the refactored sending function
            sendActualMessage(currentChatId, content);
        }
    }

    // Function to create a new chat AND THEN send the first message
    function createNewChatAndSendMessage(content) {
        console.log("Attempting to create new chat and send message:", content);
        // Disable controls immediately
        $sendButton.prop('disabled', true).html('<span class="spinner-border spinner-border-sm"></span> Creating Chat...');
        $messageInput.prop('disabled', true);
        showLoading(true); // Show main loading indicator

        $.ajax({
            url: '/api/chats',
            method: 'POST',
            headers: getAuthHeader(),
            contentType: 'application/json',
            success: function(newChat) {
                console.log("New chat created successfully:", newChat);
                currentChatId = newChat.id; // Set the new chat ID globally

                // Update UI for the new chat
                $noChatSelected.hide(); // Hide the placeholder
                $messageList.empty(); // Clear message area for the new chat
                window.location.hash = currentChatId; // Update URL

                // Load the updated chat list in the background
                loadChatList().then(() => {
                    // Ensure the new chat is selected *after* list is loaded
                    updateChatListSelection(currentChatId);
                });

                // Now, send the actual message to the newly created chat
                // Update button text slightly for clarity
                $sendButton.html('<span class="spinner-border spinner-border-sm"></span> Sending...');
                sendActualMessage(currentChatId, content); // Call the sending function

            },
            error: function(jqXHR) {
                handleAjaxError(jqXHR, "creating new chat before sending");
                showInputError("Failed to create a new chat. Cannot send message.");
                // Re-enable controls on error
                $sendButton.prop('disabled', false).text('Send');
                $messageInput.prop('disabled', false);
            },
            complete: function() {
                // Hide loading indicator regardless of success/failure of chat creation
                showLoading(false);
                // Send button state is handled by sendActualMessage or error handler now
            }
        });
    }


    function regenerateResponse(button) {
        const $button = $(button);
        // Safely get IDs, provide defaults or check validity
        const chatId = parseInt($button.data('chat-id'), 10);
        const messageId = parseInt($button.data('message-id'), 10);


        if (!chatId || isNaN(chatId) || chatId <= 0 || !messageId || isNaN(messageId) || messageId <= 0) {
            console.error("Cannot regenerate: Invalid Chat ID or Message ID found on button.", $button.data('chat-id'), $button.data('message-id'));
            showChatError("Error regenerating: Missing or invalid identifiers.");
            return;
        }


        console.log(`Regenerating response for message ${messageId} in chat ${chatId}`);
        const $messageItem = $button.closest('.message-item');
        const $messageContentDiv = $messageItem.find('.message-content');
        const $actionButtonsDiv = $button.closest('.action-buttons'); // Target the button container

        // Disable button and show spinner within the action buttons area
        $actionButtonsDiv.html('<span class="spinner-border spinner-border-sm text-secondary" role="status" aria-hidden="true"></span>');
        $messageContentDiv.html('<em class="text-muted">Regenerating response...</em>'); // Indicate regeneration

        $.ajax({
            url: `/api/chats/${chatId}/messages/${messageId}/regenerate`,
            method: 'POST',
            headers: getAuthHeader(),
            contentType: 'application/json', // Added for consistency, check if needed by backend
            success: function(updatedAssistantMessage) {
                console.log("Regenerated response received:", updatedAssistantMessage);
                const newRenderedContent = renderMarkdown(updatedAssistantMessage.content || '');
                $messageContentDiv.html(newRenderedContent); // Update content
                highlightCodeInElement($messageContentDiv); // Re-apply highlighting

                // Update timestamp
                const $timestampSpan = $messageItem.find('.timestamp');
                if ($timestampSpan.length) {
                    $timestampSpan.text(formatTimestamp(updatedAssistantMessage.timestamp));
                }

                // Restore the regenerate button with potentially updated IDs
                const newButtonHtml = `
                    <button class="btn btn-sm btn-outline-secondary regenerate-button" data-chat-id="${updatedAssistantMessage.chatId || chatId}" data-message-id="${updatedAssistantMessage.id}" title="Regenerate response">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                           <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                           <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                        </svg>
                    </button>`;
                $actionButtonsDiv.html(newButtonHtml);
                scrollToBottom();
            },
            error: function(jqXHR) {
                handleAjaxError(jqXHR, `regenerating response for message ${messageId}`);
                showChatError("Failed to regenerate response.");
                // Restore original content or show error message? Let's show error.
                $messageContentDiv.html('<span class="text-danger">Regeneration failed.</span>');

                // Restore the regenerate button so user can try again
                const originalButtonHtml = `
                    <button class="btn btn-sm btn-outline-secondary regenerate-button" data-chat-id="${chatId}" data-message-id="${messageId}" title="Regenerate response">
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                         </svg>
                    </button>`;
                $actionButtonsDiv.html(originalButtonHtml);
            }
        });
    }

    function createNewChat() {
        console.log("Creating new chat via button...");
        showLoading(true); // Indicate loading
        $.ajax({
            url: '/api/chats',
            method: 'POST',
            headers: getAuthHeader(),
            contentType: 'application/json',
            success: function(newChat) {
                console.log("New chat created:", newChat);
                // Load list first to include the new chat
                loadChatList().then(() => {
                    // Then load messages for the *specific* new chat
                    loadChatMessages(newChat.id);
                    // No need to hide loading here, loadChatMessages will handle it
                });
            },
            error: function(jqXHR) {
                handleAjaxError(jqXHR, "creating new chat");
                showChatError("Failed to create new chat.");
                showLoading(false); // Hide loading on error
            }
            // complete: function() {
            //    showLoading(false); // Loading hidden by loadChatMessages on success
            //}
        });
    }

    function updateChatListSelection(chatId) {
        $chatList.find('.list-group-item').removeClass('active');
        if (chatId) {
            const $item = $chatList.find(`[data-chat-id="${chatId}"]`);
            if ($item.length) {
                $item.addClass('active');
                // Scroll the list item into view if needed
                $item[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                console.warn(`Tried to select chat ID ${chatId}, but it was not found in the list.`);
            }
        }
    }

    function formatTimestamp(isoString, showFullDate = false) {
        if (!isoString) return '';
        try {
            const date = new Date(isoString);
            const optionsTime = {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            };
            const optionsDate = {
                year: 'numeric',
                month: 'short', // e.g., 'Dec'
                day: 'numeric'
            };

            if (showFullDate) {
                // Check if it's today
                const today = new Date();
                if (date.toDateString() === today.toDateString()) {
                    return `Today ${date.toLocaleString(undefined, optionsTime)}`;
                } else {
                    return `${date.toLocaleString(undefined, optionsDate)} ${date.toLocaleString(undefined, optionsTime)}`;
                }
            } else {
                // Just return time for individual messages
                return date.toLocaleString(undefined, optionsTime);
            }
        } catch (e) {
            console.error("Error formatting timestamp:", isoString, e);
            return isoString; // Fallback to original string
        }
    }

    function logout() {
        localStorage.removeItem('jwtToken');
        window.location.href = '/login';
    }

    // --- Event Listeners ---
    function setupEventListeners() {
        $('#message-form').on('submit', function(event) {
            event.preventDefault();
            sendMessage();
        });

        $messageInput.on('keypress', function(event) {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                sendMessage();
            }
        });

        // Use event delegation for dynamically added elements
        $messageList.on('click', '.edit-button', function() {
            const $messageItem = $(this).closest('.message-item');
            showEditMode($messageItem, true);
        });

        $messageList.on('click', '.cancel-edit-button', function() {
            const $messageItem = $(this).closest('.message-item');
            showEditMode($messageItem, false);
        });

        $messageList.on('click', '.save-edit-button', function() {
            saveMessageEdit(this);
        });

        $messageList.on('click', '.regenerate-button', function() {
            regenerateResponse(this);
        });

        // Use event delegation for chat list items too
        $chatList.on('click', '.chat-list-item', function(event) {
            event.preventDefault(); // Prevent default anchor behavior
            const chatId = $(this).data('chat-id');
            const clickedChatId = parseInt(chatId, 10); // Ensure it's a number

            if (clickedChatId && clickedChatId !== currentChatId) {
                console.log(`Chat list item clicked: ${clickedChatId}`);
                loadChatMessages(clickedChatId);
            } else if (clickedChatId && clickedChatId === currentChatId) {
                console.log(`Chat ${clickedChatId} already selected.`);
                // Optionally force reload if needed: loadChatMessages(clickedChatId);
            } else {
                console.warn("Clicked chat list item with invalid or missing chat ID:", chatId);
            }
        });


        $('#new-chat-btn').on('click', createNewChat);

        $('#logout-btn').on('click', logout);

        // Handle browser back/forward navigation using hash changes
        $(window).on('hashchange', function() {
            console.log("Hash changed:", window.location.hash);
            const hash = window.location.hash;
            if (hash && hash.startsWith('#')) {
                const chatIdFromHash = parseInt(hash.substring(1), 10);
                if (!isNaN(chatIdFromHash) && chatIdFromHash !== currentChatId) {
                    console.log(`Hash changed to valid chat ID: ${chatIdFromHash}. Loading messages.`);
                    // Check if chat exists in the list before loading
                    if ($chatList.find(`[data-chat-id="${chatIdFromHash}"]`).length > 0) {
                        loadChatMessages(chatIdFromHash);
                    } else {
                        console.warn(`Chat ID ${chatIdFromHash} from hash not found in list. Maybe list needs refresh?`);
                        // Optionally reload list then try loading messages, or show error/default state
                        loadChatList().then(() => handleInitialHash()); // Reload list and re-evaluate hash
                    }
                } else if (isNaN(chatIdFromHash)){
                    console.log("Hash changed to invalid format.");
                    // If hash is invalid or empty, show default state
                    currentChatId = null;
                    $messageList.empty();
                    $noChatSelected.show();
                    updateChatListSelection(null);
                }
                // If hash is the same as currentChatId, do nothing (already loaded)
            } else if (!hash) {
                // Hash is empty (e.g., user manually removed it)
                console.log("Hash is empty. Showing default view.");
                currentChatId = null;
                $messageList.empty();
                $noChatSelected.show();
                updateChatListSelection(null);
            }
        });
    }

    // --- Start the application ---
    initializeChat();
});