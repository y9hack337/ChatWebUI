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
        loadChatList();
        setupEventListeners();
        configureMarked();

        // Check URL hash for initial chat ID
        if(window.location.hash && window.location.hash.startsWith('#')) {
            const chatIdFromHash = window.location.hash.substring(1);
            if (!isNaN(chatIdFromHash)) {
                loadChatMessages(parseInt(chatIdFromHash, 10));
            } else {
                $noChatSelected.show();
            }
        } else {
            $noChatSelected.show();
        }
    }

    function configureMarked() {
        // Optional: Customize Marked if needed
        // marked.setOptions({ ... });
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
        if (jqXHR.status === 401 || jqXHR.status === 403) { // Unauthorized or Forbidden
            console.log("Unauthorized or Forbidden access. Logging out.");
            logout();
        } else {
            // Show a generic error message for other errors
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
        // Auto-hide after a few seconds
        setTimeout(() => $chatError.addClass('d-none'), 5000);
    }

    function showInputError(message) {
        $inputError.text(message).removeClass('d-none');
        setTimeout(() => $inputError.addClass('d-none'), 3000);
    }

    function scrollToBottom() {
        const chatWindow = document.getElementById('chat-window');
        if (chatWindow) {
            // Use timeout to ensure DOM update is complete before scrolling
            setTimeout(() => {
                chatWindow.scrollTop = chatWindow.scrollHeight;
            }, 50); // Small delay
        }
    }

    function renderMarkdown(content) {
        if (typeof marked === 'undefined') {
            console.error("Marked library is not loaded!");
            return content; // Return raw content if Marked is missing
        }
        // Sanitize potentially harmful HTML - enable this if needed, requires a sanitizer library like DOMPurify
        // const sanitizedHtml = DOMPurify.sanitize(marked.parse(content));
        // return sanitizedHtml;
        return marked.parse(content); // Use without sanitization for now (be careful with untrusted content)
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
        $.ajax({
            url: '/api/chats',
            method: 'GET',
            headers: getAuthHeader(),
            success: function(chats) {
                console.log("Chats received:", chats);
                $chatList.empty(); // Clear existing list
                if (chats && chats.length > 0) {
                    chats.forEach(chat => {
                        const chatItem = `
                            <a href="#${chat.id}" data-chat-id="${chat.id}" class="list-group-item list-group-item-action chat-list-item">
                                Chat ${chat.id}
                                <small class="d-block text-muted">${formatTimestamp(chat.createdAt)}</small>
                            </a>`;
                        $chatList.append(chatItem);
                    });
                    // If a chat is currently selected, mark it active
                    if (currentChatId) {
                        $chatList.find(`.chat-list-item[data-chat-id="${currentChatId}"]`).addClass('active');
                    }
                } else {
                    $chatList.append('<p class="text-muted p-2">No chats yet.</p>');
                }
            },
            error: function(jqXHR) {
                handleAjaxError(jqXHR, "loading chat list");
                $chatList.append('<p class="text-danger p-2">Error loading chats.</p>');
            }
        });
    }

    // --- Message Handling ---
    function loadChatMessages(chatId) {
        if (!chatId) return;
        console.log(`Loading messages for chat ${chatId}`);

        if (currentChatId === chatId && $messageList.children().length > 0 && !$noChatSelected.is(':visible')) {
            console.log(`Chat ${chatId} already loaded.`);
            return; // Avoid reloading if already active, unless forced
        }


        currentChatId = chatId;
        $messageList.empty(); // Clear previous messages
        $noChatSelected.hide(); // Hide the initial message
        showLoading(true);
        $chatError.addClass('d-none'); // Hide previous errors
        updateChatListSelection(chatId);
        // Update URL hash
        window.location.hash = chatId;


        $.ajax({
            url: `/api/chats/${chatId}/messages`,
            method: 'GET',
            headers: getAuthHeader(),
            success: function(messages) {
                console.log(`Messages for chat ${chatId}:`, messages);
                $messageList.empty(); // Ensure list is clear before adding
                if (messages && messages.length > 0) {
                    messages.forEach(msg => {
                        // Display message and add appropriate class for controls
                        const $el = displayMessage(msg);
                        if(msg.role === 'USER' && msg.id) {
                            $el.addClass('can-edit');
                        } else if (msg.role === 'ASSISTANT' && msg.id) {
                            $el.addClass('can-regenerate');
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
            }
        });
    }

    function displayMessage(message) { // No isOptimistic needed now
        const roleClass = message.role ? message.role.toLowerCase() : 'unknown';
        const formattedTimestamp = message.timestamp ? formatTimestamp(message.timestamp) : '';
        const renderedContent = renderMarkdown(message.content || '');
        const isUserMessage = roleClass === 'user';
        const messageId = message.id; // Use real ID if available (will be null/undefined for optimistic)
        const elementId = messageId ? `message-${messageId}` : `optimistic-${Date.now()}-${Math.random()}`;

        // Structure for edit controls (only relevant if user message)
        const editControlsHtml = `
            <div class="edit-controls"> <!-- Initially hidden by CSS -->
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
                <div class="edit-error text-danger small mt-1"></div>
            </div>
        `;

        // Structure for regenerate button (only relevant if assistant message)
        const regenerateButtonHtml = `
            <div class="action-buttons"> <!-- Initially hidden by CSS -->
                 <button class="btn btn-sm btn-outline-secondary regenerate-button" data-chat-id="${message.chatId || currentChatId}" data-message-id="${messageId || ''}" title="Regenerate response">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                       <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                       <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                    </svg>
                 </button>
            </div>`;


        // --- Combine elements ---
        // Add data-message-id only if it exists
        const messageHtml = `
           <div id="${elementId}" class="message-item ${roleClass}"
                ${messageId ? `data-message-id="${messageId}"` : ''}
                data-chat-id="${message.chatId || currentChatId || ''}">
               <div class="message-content">
                   ${renderedContent}
               </div>
               ${isUserMessage ? editControlsHtml : regenerateButtonHtml} <!-- Render one or the other -->
               <span class="timestamp">${formattedTimestamp}</span>
           </div>
        `;

        const $messageElement = $(messageHtml);

        // Store original content and pre-fill if it's a user message structure
        if (isUserMessage) {
            $messageElement.find('.edit-textarea').val(message.content);
            $messageElement.data('original-content', message.content);
        }

        $messageList.append($messageElement);
        highlightCodeInElement($messageElement);
        return $messageElement; // Return the created element
    }

    function showEditMode($messageItem, show = true) {
        const $contentDiv = $messageItem.find('.message-content');
        const $editArea = $messageItem.find('.edit-area');
        const $editControls = $messageItem.find('.edit-controls'); // Pencil button div

        if (show) {
            const originalText = $messageItem.data('original-content');
            $editArea.find('.edit-textarea').val(originalText);
            $editArea.find('.edit-error').text('').addClass('d-none');
            $contentDiv.addClass('d-none');
            $editControls.hide(); // Hide the pencil button div
            $messageItem.addClass('editing'); // Add class to message item itself
            $editArea.removeClass('d-none');
            $editArea.find('.edit-textarea').focus();
        } else {
            $contentDiv.removeClass('d-none');
            $editArea.addClass('d-none');
            $messageItem.removeClass('editing'); // Remove editing class
            // $editControls should become visible again via CSS hover if applicable
        }
    }

    function saveMessageEdit(button) {
        const $button = $(button);
        const $messageItem = $button.closest('.message-item');
        const messageId = $messageItem.data('message-id'); // Should be the real ID now

        if (!messageId) {
            console.error("Attempted to save edit without a valid message ID.", $messageItem);
            $messageItem.find('.edit-error').text('Error: Cannot save, message ID missing.').removeClass('d-none');
            return;
        }

        // ... rest of saveMessageEdit logic (get content, chatId, AJAX call) ...
        const $editArea = $button.closest('.edit-area');
        const $contentDiv = $messageItem.find('.message-content');
        const $errorDiv = $editArea.find('.edit-error');
        const chatId = $messageItem.data('chat-id'); // Get chatId too
        const newContent = $editArea.find('.edit-textarea').val().trim();


        if (!newContent) { /* ... */ }
        if (!chatId) { /* ... */ }

        $errorDiv.text('').addClass('d-none');
        $button.prop('disabled', true).siblings('button').prop('disabled', true);
        $button.html('<span class="spinner-border spinner-border-sm"></span> Saving...');

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
                $messageItem.data('original-content', updatedMessage.content);

                const $timestampSpan = $messageItem.find('.timestamp');
                if ($timestampSpan.length) {
                    $timestampSpan.text(formatTimestamp(updatedMessage.timestamp));
                }

                showEditMode($messageItem, false); // Exit edit mode
                $button.prop('disabled', false).text('Save').siblings('button').prop('disabled', false);
                // No need to call $editControls.show() explicitly
                scrollToBottom();
            },
            error: function(jqXHR) {
                handleAjaxError(jqXHR, `saving edit for message ${messageId}`);
                // ... error display ...
                $errorDiv.text(errorMsg).removeClass('d-none');
                $button.prop('disabled', false).text('Save').siblings('button').prop('disabled', false);
                // Don't automatically exit edit mode on error, let user cancel or retry
            }
        });
    }



    function sendMessage() {
        const content = $messageInput.val().trim();
        if (!content || !currentChatId) {
            // ... show input error ...
            return;
        }
        console.log(`Sending message to chat ${currentChatId}: ${content}`);

        // Optimistic UI update: Show user message immediately
        const optimisticUserMessage = {
            // NO id property here initially
            chatId: currentChatId,
            role: 'USER',
            content: content,
            timestamp: new Date().toISOString() // Timestamp for display
        };
        // Display optimistic message - it won't have 'can-edit' class yet
        const $optimisticElement = displayMessage(optimisticUserMessage);

        $messageInput.val('');
        $sendButton.prop('disabled', true).html('<span class="spinner-border spinner-border-sm"></span>');

        $.ajax({
            url: `/api/chats/${currentChatId}/messages`,
            method: 'POST',
            headers: getAuthHeader(),
            contentType: 'application/json',
            data: JSON.stringify({ content: content }),
            success: function(response) { // Expecting SendMessageResponse
                console.log("Send/Response successful:", response);

                // Update the optimistic user message element with REAL data
                if ($optimisticElement.length && response.userMessage && response.userMessage.id) {
                    console.log(`Updating optimistic message element with real ID: ${response.userMessage.id}`);

                    $optimisticElement.attr('id', `message-${response.userMessage.id}`);
                    $optimisticElement.attr('data-message-id', response.userMessage.id);
                    $optimisticElement.data('message-id', response.userMessage.id); // Update jQuery data

                    // Add the class that enables hover effects for edit button
                    $optimisticElement.addClass('can-edit');

                    // Update stored original content and textarea value
                    $optimisticElement.data('original-content', response.userMessage.content);
                    $optimisticElement.find('.edit-textarea').val(response.userMessage.content);

                    // Update timestamp if needed (backend value might be slightly different)
                    const $timestampSpan = $optimisticElement.find('.timestamp');
                    if ($timestampSpan.length) {
                        $timestampSpan.text(formatTimestamp(response.userMessage.timestamp));
                    }


                } else {
                    console.warn("Could not find optimistic message element or userMessage ID in response.");
                    // Maybe remove the optimistic message if update failed?
                    $optimisticElement.remove();
                    showChatError("Error displaying your sent message. Please refresh.");
                }

                // Display the assistant message - add can-regenerate class
                if (response.assistantMessage && response.assistantMessage.id) {
                    const $assistantElement = displayMessage(response.assistantMessage);
                    $assistantElement.addClass('can-regenerate');
                    // Update its data attributes explicitly just in case displayMessage didn't catch it
                    $assistantElement.attr('data-message-id', response.assistantMessage.id);
                    $assistantElement.data('message-id', response.assistantMessage.id);
                    $assistantElement.find('.regenerate-button').attr('data-message-id', response.assistantMessage.id);

                } else {
                    console.error("Assistant message missing ID or missing entirely from response.");
                    showChatError("Assistant response was not received correctly.");
                }

                $sendButton.prop('disabled', false).text('Send');
                scrollToBottom(); // Scroll after everything is added/updated
            },
            error: function(jqXHR) {
                handleAjaxError(jqXHR, `sending message to chat ${currentChatId}`);
                showInputError("Failed to send message.");
                $optimisticElement.addClass('message-error').find('.message-content').append(' <span class="text-danger small">(Failed)</span>');
                $sendButton.prop('disabled', false).text('Send');
            }
        });
    }

    function regenerateResponse(button) {
        const $button = $(button);
        const chatId = $button.data('chat-id');
        // --- Get messageId from the button's data attribute ---
        const messageId = $button.data('message-id');

        // --- Check if messageId is valid ---
        if (!chatId || !messageId || typeof messageId !== 'number' || messageId <= 0) {
            console.error("Cannot regenerate: Invalid Chat ID or Message ID found on button.", chatId, messageId);
            showChatError("Error regenerating: Missing or invalid identifiers.");
            // Try to find it from the parent if missing on button? (Less ideal)
            // const parentMessageId = $button.closest('.message-item').data('message-id');
            return;
        }
        // --- End Check ---

        console.log(`Regenerating response for message ${messageId} in chat ${chatId}`);
        const $messageItem = $button.closest('.message-item');
        const $messageContentDiv = $messageItem.find('.message-content');

        $button.prop('disabled', true).html('<span class="spinner-border spinner-border-sm"></span>');
        $messageContentDiv.html('<span class="text-muted fst-italic">Regenerating...</span>');

        $.ajax({
            url: `/api/chats/${chatId}/messages/${messageId}/regenerate`,
            method: 'POST',
            headers: getAuthHeader(),
            contentType: 'application/json',
            success: function(updatedAssistantMessage) {
                console.log("Regenerated response received:", updatedAssistantMessage);
                const newRenderedContent = renderMarkdown(updatedAssistantMessage.content || '');
                $messageContentDiv.html(newRenderedContent);
                highlightCodeInElement($messageContentDiv);

                const $timestampSpan = $messageItem.find('.timestamp');
                if ($timestampSpan.length) {
                    $timestampSpan.text(formatTimestamp(updatedAssistantMessage.timestamp));
                }
                // Restore the regenerate button (HTML is inside action-buttons div)
                $messageItem.find('.action-buttons').html(`
                    <button class="btn btn-sm btn-outline-secondary regenerate-button" data-chat-id="${updatedAssistantMessage.chatId}" data-message-id="${updatedAssistantMessage.id}" title="Regenerate response">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                          <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                       </svg>
                    </button>`);
                scrollToBottom();
            },
            error: function(jqXHR) {
                handleAjaxError(jqXHR, `regenerating response for message ${messageId}`);
                showChatError("Failed to regenerate response.");
                $messageContentDiv.html('<span class="text-danger">Regeneration failed.</span>');
                // Restore the regenerate button on error too
                $messageItem.find('.action-buttons').html(`
                    <button class="btn btn-sm btn-outline-secondary regenerate-button" data-chat-id="${chatId}" data-message-id="${messageId}" title="Regenerate response">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                          <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                       </svg>
                    </button>`);
            }
        });
    }


    function createNewChat() {
        console.log("Creating new chat...");
        $.ajax({
            url: '/api/chats',
            method: 'POST',
            headers: getAuthHeader(),
            contentType: 'application/json',
            success: function(newChat) {
                console.log("New chat created:", newChat);
                loadChatList(); // Refresh the list
                loadChatMessages(newChat.id); // Load the new empty chat
            },
            error: function(jqXHR) {
                handleAjaxError(jqXHR, "creating new chat");
                showChatError("Failed to create new chat.");
            }
        });
    }

    function updateChatListSelection(chatId) {
        $chatList.find('.chat-list-item').removeClass('active');
        $chatList.find(`.chat-list-item[data-chat-id="${chatId}"]`).addClass('active');
    }

    function formatTimestamp(isoString) {
        if (!isoString) return '';
        try {
            const date = new Date(isoString);
            // Adjust options as needed
            return date.toLocaleString(undefined, {
                // year: 'numeric', month: 'short', day: 'numeric',
                hour: 'numeric', minute: '2-digit', hour12: true
            });
        } catch (e) {
            console.error("Error formatting timestamp:", isoString, e);
            return isoString; // Return original string if parsing fails
        }
    }

    function logout() {
        localStorage.removeItem('jwtToken');
        window.location.href = '/login';
    }

    // --- Event Listeners ---
    function setupEventListeners() {
        // Send message form
        $('#message-form').on('submit', function(event) {
            event.preventDefault();
            sendMessage();
        });



        // Allow sending with Enter key in textarea (Shift+Enter for newline)
        $messageInput.on('keypress', function(event) {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault(); // Prevent newline
                sendMessage();
            }
        });

        $messageList.on('click', '.edit-button', function() {
            const $messageItem = $(this).closest('.message-item');
            showEditMode($messageItem, true);
        });

        // Cancel Edit button click (using event delegation on message list)
        $messageList.on('click', '.cancel-edit-button', function() {
            const $messageItem = $(this).closest('.message-item');
            showEditMode($messageItem, false);
        });

        // Save Edit button click (using event delegation on message list)
        $messageList.on('click', '.save-edit-button', function() {
            saveMessageEdit(this);
        });

        // Chat list item click (using event delegation)
        $chatList.on('click', '.chat-list-item', function(event) {
            event.preventDefault(); // Prevent default anchor behavior
            const chatId = $(this).data('chat-id');
            if (chatId && chatId !== currentChatId) {
                loadChatMessages(chatId);
            }
        });

        // New Chat button
        $('#new-chat-btn').on('click', createNewChat);

        // Logout button
        $('#logout-btn').on('click', logout);

        // Regenerate button click (using event delegation)
        $messageList.on('click', '.regenerate-button', function() {
            regenerateResponse(this);
        });
    }

    // --- Start the application ---
    initializeChat();

});