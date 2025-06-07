$(document).ready(function() {
    // --- Login Form Handling ---
    $('#login-form').on('submit', function(event) {
        event.preventDefault();

        const email = $('#email').val();
        const password = $('#password').val();
        const $errorMessage = $('#error-message');
        $errorMessage.addClass('d-none').text('');

        $.ajax({
            url: '/api/auth/login',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email: email, password: password }),
            success: function(response) {
                console.log('Login successful:', response);
                if (response.accessToken) {
                    localStorage.setItem('jwtToken', response.accessToken);
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
                    try {
                        const errData = JSON.parse(jqXHR.responseText);
                        if (errData.message) errorMsg = errData.message;
                    } catch (e) {
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
                $successMessage.text('Registration successful! You can now log in.').removeClass('d-none');
                $('#register-form')[0].reset();
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
});


// Function to automatically log in the user after registration/login
function autoLogin(email, password) {
    $.ajax({
        url: '/api/auth/login', // Убедитесь, что это правильный URL для логина на сервере
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ email: email, password: password }),
        success: function(response) {
            console.log('Login successful:', response);
            if (response.accessToken) {
                localStorage.setItem('jwtToken', response.accessToken);
                window.location.href = '/chat'; // Перенаправляем пользователя на страницу чата
            } else {
                $('#error-message').text('Ошибка входа: Токен не получен.').removeClass('hidden');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Login error:', textStatus, errorThrown, jqXHR.responseText);
            let errorMsg = 'Ошибка входа. Пожалуйста, проверьте email и пароль.';
            if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
                errorMsg = jqXHR.responseJSON.message;
            } else if (jqXHR.responseText) {
                try {
                    const errData = JSON.parse(jqXHR.responseText);
                    if (errData.message) errorMsg = errData.message;
                } catch (e) {
                    if (jqXHR.status === 401) {
                        errorMsg = 'Неверный email или пароль.';
                    } else if (jqXHR.status === 400) {
                        errorMsg = 'Некорректный запрос.';
                    }
                }
            }
            $('#error-message').text(errorMsg).removeClass('hidden');
        }
    });
}