// --- Registration Form Handling ---
$('#register-form').on('submit', function(event) {
    event.preventDefault();

    const email = $('#email').val();
    const password = $('#password').val();
    const confirmPassword = $('#confirmPassword').val();
    const $errorMessage = $('#error-message');
    const $successMessage = $('#success-message');

    $errorMessage.addClass('d-none').text('');
    $successMessage.addClass('d-none').text('');

    if (password !== confirmPassword) {
        $errorMessage.text('Passwords do not match.').removeClass('d-none');
        return;
    }

    if (password.length < 6) {
        $errorMessage.text('Password must be at least 6 characters long.').removeClass('d-none');
        return;
    }

    $.ajax({
        url: '/api/auth/register',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ email: email, password: password }),
        success: function(response) {
            console.log('Registration successful:', response);
            $successMessage.text('Registration successful! Logging in...').removeClass('d-none');
            // Automatically log in the user
            autoLogin(email, password);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Registration error:', textStatus, errorThrown, jqXHR.responseText);
            let errorMsg = 'Registration failed. Please try again.';
            if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
                errorMsg = jqXHR.responseJSON.message;
            } else if (jqXHR.responseText) {
                try {
                    const errData = JSON.parse(jqXHR.responseText);
                    if (errData.message) errorMsg = errData.message;
                    else if (errData.errors) {
                        errorMsg = Object.values(errData.errors).join(' ');
                    }
                } catch (e) {
                    if (jqXHR.status === 400) {
                        errorMsg = 'Registration failed. The email might already be in use.';
                    }
                }
            }
            $errorMessage.text(errorMsg).removeClass('d-none');
        }
    });
});

// Function to automatically log in the user after registration
function autoLogin(email, password) {
    $.ajax({
        url: '/api/auth/login',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ email: email, password: password }),
        success: function(response) {
            console.log('Auto login successful:', response);
            if (response.accessToken) {
                localStorage.setItem('jwtToken', response.accessToken);
                window.location.href = '/chat';
            } else {
                $('#error-message').text('Auto login failed: No token received.').removeClass('d-none');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Auto login error:', textStatus, errorThrown, jqXHR.responseText);
            let errorMsg = 'Auto login failed. Please log in manually.';
            if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
                errorMsg = jqXHR.responseJSON.message;
            } else if (jqXHR.responseText) {
                try {
                    const errData = JSON.parse(jqXHR.responseText);
                    if (errData.message) errorMsg = errData.message;
                } catch (e) {
                    if (jqXHR.status === 401) {
                        errorMsg = 'Incorrect email or password.';
                    }
                }
            }
            $('#error-message').text(errorMsg).removeClass('d-none');
        }
    });
}