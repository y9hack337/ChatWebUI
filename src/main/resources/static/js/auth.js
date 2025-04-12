$(document).ready(function() {

    // --- Login Form Handling ---
    $('#login-form').on('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const email = $('#email').val();
        const password = $('#password').val();
        const $errorMessage = $('#error-message');
        $errorMessage.addClass('d-none').text(''); // Hide error message initially

        $.ajax({
            url: '/api/auth/login',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email: email, password: password }),
            success: function(response) {
                console.log('Login successful:', response);
                if (response.accessToken) {
                    // Store the token (e.g., in localStorage)
                    localStorage.setItem('jwtToken', response.accessToken);
                    // Redirect to the chat page
                    window.location.href = '/chat';
                } else {
                    $errorMessage.text('Login failed: No token received.').removeClass('d-none');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Login error:', textStatus, errorThrown, jqXHR.responseText);
                let errorMsg = 'Login failed. Please check your credentials.';
                if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
                    errorMsg = jqXHR.responseJSON.message;
                } else if (jqXHR.responseText) {
                    try { // Try to parse if it's JSON even if content type wasn't set right
                        const errData = JSON.parse(jqXHR.responseText);
                        if (errData.message) errorMsg = errData.message;
                    } catch(e) {
                        // If responseText isn't JSON or has other issues
                        if (jqXHR.status === 401) {
                            errorMsg = 'Incorrect email or password.';
                        }
                    }
                }
                $errorMessage.text(errorMsg).removeClass('d-none');
            }
        });
    });

    // --- Registration Form Handling ---
    $('#register-form').on('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const email = $('#email').val();
        const password = $('#password').val();
        const confirmPassword = $('#confirmPassword').val();
        const $errorMessage = $('#error-message');
        const $successMessage = $('#success-message');

        $errorMessage.addClass('d-none').text('');
        $successMessage.addClass('d-none').text('');

        if (password !== confirmPassword) {
            $errorMessage.text('Passwords do not match.').removeClass('d-none');
            return; // Stop submission
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
                $successMessage.text('Registration successful! You can now log in.').removeClass('d-none');
                // Optional: Clear form or redirect to login after a delay
                $('#register-form')[0].reset();
                setTimeout(function() {
                    // window.location.href = '/login'; // Redirect to login
                }, 2000);
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
                        // Handle specific validation errors if backend provides them
                        else if (errData.errors) {
                            errorMsg = Object.values(errData.errors).join(' ');
                        }
                    } catch (e) {
                        if (jqXHR.status === 400) { // Bad Request often means validation error like duplicate email
                            errorMsg = 'Registration failed. The email might already be in use.';
                        }
                    }
                }
                $errorMessage.text(errorMsg).removeClass('d-none');
            }
        });
    });

});