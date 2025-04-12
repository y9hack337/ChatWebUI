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

        if (window.location.hash && window.location.hash.startsWith('#')) {
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
        return marked.parse(content);
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
                $chatList.empty();
                if (chats && chats.length > 0) {
                    chats.forEach(chat => {
                        const chatItem = `
                            <a href="#${chat.id}" data-chat-id="${chat.id}" class="list-group-item list-group-item-action bg-dark text-light border-secondary animate__animated animate__fadeInUp">
                                Chat ${chat.id}
                                <small class="d-block text-muted">${formatTimestamp(chat.createdAt)}</small>
                            </a>`;
                        $chatList.append(chatItem);
                    });
                    if (currentChatId) {
                        $chatList.find(`[data-chat-id="${currentChatId}"]`).addClass('active');
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
            return;
        }

        currentChatId = chatId;
        $messageList.empty();
        $noChatSelected.hide();
        showLoading(true);
        $chatError.addClass('d-none');
        updateChatListSelection(chatId);
        window.location.hash = chatId;

        $.ajax({
            url: `/api/chats/${chatId}/messages`,
            method: 'GET',
            headers: getAuthHeader(),
            success: function(messages) {
                console.log(`Messages for chat ${chatId}:`, messages);
                $messageList.empty();
                if (messages && messages.length > 0) {
                    messages.forEach(msg => {
                        const $el = displayMessage(msg);
                        if (msg.role === 'USER' && msg.id) {
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

    function displayMessage(message) {
        const roleClass = message.role ? message.role.toLowerCase() : 'unknown';
        const formattedTimestamp = message.timestamp ? formatTimestamp(message.timestamp) : '';
        const renderedContent = renderMarkdown(message.content || '');
        const isUserMessage = roleClass === 'user';
        const messageId = message.id;
        const elementId = messageId ? `message-${messageId}` : `optimistic-${Date.now()}-${Math.random()}`;

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
                <div class="edit-error text-danger small mt-1"></div>
            </div>
        `;

        const regenerateButtonHtml = `
            <div class="action-buttons">
                <button class="btn btn-sm btn-outline-secondary regenerate-button" data-chat-id="${message.chatId || currentChatId}" data-message-id="${messageId || ''}" title="Regenerate response">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                    </svg>
                </button>
            </div>`;

        const messageHtml = `
            <div id="${elementId}" class="message-item ${roleClass} animate__animated animate__fadeInUp"
                 ${messageId ? `data-message-id="${messageId}"` : ''}
                 data-chat-id="${message.chatId || currentChatId || ''}">
                <div class="message-content">${renderedContent}</div>
                ${isUserMessage ? editControlsHtml : regenerateButtonHtml}
                <span class="timestamp">${formattedTimestamp}</span>
            </div>
        `;

        const $messageElement = $(messageHtml);

        if (isUserMessage) {
            $messageElement.find('.edit-textarea').val(message.content);
            $messageElement.data('original-content', message.content);
        }

        $messageList.append($messageElement);
        highlightCodeInElement($messageElement);
        return $messageElement;
    }

    function showEditMode($messageItem, show = true) {
        const $contentDiv = $messageItem.find('.message-content');
        const $editArea = $messageItem.find('.edit-area');
        const $editControls = $messageItem.find('.edit-controls');

        if (show) {
            const originalText = $messageItem.data('original-content');
            $editArea.find('.edit-textarea').val(originalText);
            $editArea.find('.edit-error').text('').addClass('d-none');
            $contentDiv.addClass('d-none');
            $editControls.hide();
            $messageItem.addClass('editing');
            $editArea.removeClass('d-none');
            $editArea.find('.edit-textarea').focus();
        } else {
            $contentDiv.removeClass('d-none');
            $editArea.addClass('d-none');
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

                showEditMode($messageItem, false);
                $button.prop('disabled', false).text('Save').siblings('button').prop('disabled', false);
                scrollToBottom();
            },
            error: function(jqXHR) {
                handleAjaxError(jqXHR, `saving edit for message ${messageId}`);
                $errorDiv.text('Failed to save edit. Please try again.').removeClass('d-none');
                $button.prop('disabled', false).text('Save').siblings('button').prop('disabled', false);
            }
        });
    }

    function sendMessage() {
        const content = $messageInput.val().trim();
        if (!content || !currentChatId) {
            showInputError('Please select a chat and enter a message.');
            return;
        }
        console.log(`Sending message to chat ${currentChatId}: ${content}`);

        const optimisticUserMessage = {
            chatId: currentChatId,
            role: 'USER',
            content: content,
            timestamp: new Date().toISOString()
        };
        const $optimisticElement = displayMessage(optimisticUserMessage);

        $messageInput.val('');
        $sendButton.prop('disabled', true).html('<span class="spinner-border spinner-border-sm"></span>');

        $.ajax({
            url: `/api/chats/${currentChatId}/messages`,
            method: 'POST',
            headers: getAuthHeader(),
            contentType: 'application/json',
            data: JSON.stringify({ content: content }),
            success: function(response) {
                console.log("Send/Response successful:", response);

                if ($optimisticElement.length && response.userMessage && response.userMessage.id) {
                    console.log(`Updating optimistic message element with real ID: ${response.userMessage.id}`);
                    $optimisticElement.attr('id', `message-${response.userMessage.id}`);
                    $optimisticElement.attr('data-message-id', response.userMessage.id);
                    $optimisticElement.data('message-id', response.userMessage.id);
                    $optimisticElement.addClass('can-edit');
                    $optimisticElement.data('original-content', response.userMessage.content);
                    $optimisticElement.find('.edit-textarea').val(response.userMessage.content);
                    const $timestampSpan = $optimisticElement.find('.timestamp');
                    if ($timestampSpan.length) {
                        $timestampSpan.text(formatTimestamp(response.userMessage.timestamp));
                    }
                } else {
                    console.warn("Could not find optimistic message element or userMessage ID in response.");
                    $optimisticElement.remove();
                    showChatError("Error displaying your sent message. Please refresh.");
                }

                if (response.assistantMessage && response.assistantMessage.id) {
                    const $assistantElement = displayMessage(response.assistantMessage);
                    $assistantElement.addClass('can-regenerate');
                    $assistantElement.attr('data-message-id', response.assistantMessage.id);
                    $assistantElement.data('message-id', response.assistantMessage.id);
                    $assistantElement.find('.regenerate-button').attr('data-message-id', response.assistantMessage.id);
                } else {
                    console.error("Assistant message missing ID or missing entirely from response.");
                    showChatError("Assistant response was not received correctly.");
                }

                $sendButton.prop('disabled', false).text('Send');
                scrollToBottom();
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
        const messageId = $button.data('message-id');

        if (!chatId || !messageId || typeof messageId !== 'number' || messageId <= 0) {
            console.error("Cannot regenerate: Invalid Chat ID or Message ID found on button.", chatId, messageId);
            showChatError("Error regenerating: Missing or invalid identifiers.");
            return;
        }

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
                loadChatList();
                loadChatMessages(newChat.id);
            },
            error: function(jqXHR) {
                handleAjaxError(jqXHR, "creating new chat");
                showChatError("Failed to create new chat.");
            }
        });
    }

    function updateChatListSelection(chatId) {
        $chatList.find('.list-group-item').removeClass('active');
        $chatList.find(`[data-chat-id="${chatId}"]`).addClass('active');
    }

    function formatTimestamp(isoString) {
        if (!isoString) return '';
        try {
            const date = new Date(isoString);
            return date.toLocaleString(undefined, {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
        } catch (e) {
            console.error("Error formatting timestamp:", isoString, e);
            return isoString;
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

        $chatList.on('click', '.list-group-item', function(event) {
            event.preventDefault();
            const chatId = $(this).data('chat-id');
            if (chatId && chatId !== currentChatId) {
                loadChatMessages(chatId);
            }
        });

        $('#new-chat-btn').on('click', createNewChat);

        $('#logout-btn').on('click', logout);

        $messageList.on('click', '.regenerate-button', function() {
            regenerateResponse(this);
        });
    }

    // --- Start the application ---
    initializeChat();
});