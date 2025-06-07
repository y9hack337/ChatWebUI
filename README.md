<div id="top">

<!-- HEADER STYLE: CLASSIC -->
<div align="center">

<img src="https://i.imgur.com/dYuod5A.png" width="30%" style="position: relative; top: 0; right: 0;" alt="Project Logo"/>

# CHATWEBUI

<em>Empowering Conversations with AI Interaction</em>

<div align="center">
<p>Choose your language:</p>
<a href="README.md">
    <img src="https://img.shields.io/badge/Language-English-blue?style=for-the-badge&logo=us&logoColor=white" alt="English">
</a>
<a href="README.ru.md">
    <img src="https://img.shields.io/badge/Язык-Русский-red?style=for-the-badge&logo=ru&logoColor=white" alt="Русский">
</a>
</div>
<br>

<!-- BADGES -->
<!-- local repository, no metadata badges. -->

<em>Built with the tools and technologies:</em>

<img src="https://img.shields.io/badge/npm-CB3837.svg?style=default&logo=npm&logoColor=white" alt="npm">
<img src="https://img.shields.io/badge/Org-77AA99.svg?style=default&logo=Org&logoColor=white" alt="Org">
<img src="https://img.shields.io/badge/Gradle-02303A.svg?style=default&logo=Gradle&logoColor=white" alt="Gradle">
<img src="https://img.shields.io/badge/jQuery-0769AD.svg?style=default&logo=jQuery&logoColor=white" alt="jQuery">
<img src="https://img.shields.io/badge/bat-31369E.svg?style=default&logo=bat&logoColor=white" alt="bat">
<img src="https://img.shields.io/badge/Java-ED8B00.svg?style=default&logo=Java&logoColor=white" alt="Java">
<img src="https://img.shields.io/badge/Bootstrap-7952B3.svg?style=default&logo=Bootstrap&logoColor=white" alt="Bootstrap">

</div>
<br>

---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
    - [Project Index](#project-index)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Usage](#usage)
    - [Testing](#testing)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## Overview

ChatWebUI is a user-friendly chat application with reliable data storage, secure authentication, and built-in ChatGPT support.

---

## Project Structure

```sh
└── ChatWebUI/
    ├── build.gradle.kts
    ├── gptchatdb.mv.db
    ├── gradle
    │   └── wrapper
    ├── gradlew
    ├── gradlew.bat
    ├── settings.gradle.kts
    └── src
        └── main
```

### Project Index

<details open>
	<summary><b><code>CHATWEBUI/</code></b></summary>
	<!-- __root__ Submodule -->
	<details>
		<summary><b>__root__</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ __root__</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='ChatWebUI/blob/master/build.gradle.kts'>build.gradle.kts</a></b></td>
					<td style='padding: 8px;'>- Defines project configurations and dependencies for a Spring Boot application supporting web development, data persistence, and secure user authentication<br>- Establishes a Kotlin-based environment with essential libraries, including JPA for database interactions, JWT for token-based security, and various Spring Boot starters to streamline application features<br>- Additionally facilitates testing and UI enhancements through integrated web resources and frameworks, contributing to a well-structured and functional software architecture.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='ChatWebUI/blob/master/gradlew.bat'>gradlew.bat</a></b></td>
					<td style='padding: 8px;'>- Provides a Gradle startup script for Windows environments, facilitating the execution of build automation tasks for the project<br>- It sets necessary configurations, including the applications home directory and default JVM options, while ensuring that the Java runtime is correctly identified<br>- This script acts as a key entry point for initializing the Gradle wrapper, streamlining the overall build process within the codebase architecture.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='ChatWebUI/blob/master/settings.gradle.kts'>settings.gradle.kts</a></b></td>
					<td style='padding: 8px;'>- Defines the root project name as ChatWebUI, establishing a clear identity for the project within its overall architecture<br>- This foundational element helps organize various modules and components, ensuring coherence and consistency across the codebase<br>- As a part of the project structure, it plays a crucial role in facilitating builds and dependencies, ultimately supporting seamless development and collaboration.</td>
				</tr>
			</table>
		</blockquote>
	</details>
	<!-- src Submodule -->
	<details>
		<summary><b>src</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ src</b></code>
			<!-- main Submodule -->
			<details>
				<summary><b>main</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ src.main</b></code>
					<!-- java Submodule -->
					<details>
						<summary><b>java</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ src.main.java</b></code>
							<!-- org Submodule -->
							<details>
								<summary><b>org</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.main.java.org</b></code>
									<!-- hack337 Submodule -->
									<details>
										<summary><b>hack337</b></summary>
										<blockquote>
											<div class='directory-path' style='padding: 8px 0; color: #666;'>
												<code><b>⦿ src.main.java.org.hack337</b></code>
											<!-- gptchat Submodule -->
											<details>
												<summary><b>gptchat</b></summary>
												<blockquote>
													<div class='directory-path' style='padding: 8px 0; color: #666;'>
														<code><b>⦿ src.main.java.org.hack337.gptchat</b></code>
													<table style='width: 100%; border-collapse: collapse;'>
													<thead>
														<tr style='background-color: #f8f9fa;'>
															<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
															<th style='text-align: left; padding: 8px;'>Summary</th>
														</tr>
													</thead>
														<tr style='border-bottom: 1px solid #eee;'>
															<td style='padding: 8px;'><b><a href='ChatWebUI/blob/master/src\main\java\org\hack337\gptchat\GptChatApplication.java'>GptChatApplication.java</a></b></td>
															<td style='padding: 8px;'>- Launches the GptChat application, serving as the main entry point in the project’s architecture<br>- Utilizing Spring Boot, it initializes the application context and configurations, enabling seamless integration of features<br>- By scanning for configuration properties, it allows for flexible customization, thereby facilitating the development of a robust chat application powered by advanced AI capabilities.</td>
														</tr>
													</table>
													<!-- config Submodule -->
													<details>
														<summary><b>config</b></summary>
														<blockquote>
															<div class='directory-path' style='padding: 8px 0; color: #666;'>
																<code><b>⦿ src.main.java.org.hack337.gptchat.config</b></code>
															<table style='width: 100%; border-collapse: collapse;'>
															<thead>
																<tr style='background-color: #f8f9fa;'>
																	<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
																	<th style='text-align: left; padding: 8px;'>Summary</th>
																</tr>
															</thead>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='ChatWebUI/blob/master/src\main\java\org\hack337\gptchat\config\JwtProperties.java'>JwtProperties.java</a></b></td>
																	<td style='padding: 8px;'>- Manages JWT (JSON Web Token) properties within the GPTChat application, facilitating secure user authentication and authorization<br>- By defining essential configuration attributes such as the secret key and expiration time, it ensures proper validation and enforcement of security measures, thereby playing a critical role in the overall architecture for protecting sensitive data and maintaining session integrity throughout the application.</td>
																</tr>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='ChatWebUI/blob/master/src\main\java\org\hack337\gptchat\config\SecurityConfig.java'>SecurityConfig.java</a></b></td>
																	<td style='padding: 8px;'>- Establishes security configurations for the application, ensuring a robust authentication and authorization system<br>- It integrates JWT-based authentication while configuring access rules and session management<br>- By permitting certain endpoints for public access and securing others, it facilitates a secure environment for user interactions within the broader chat application architecture, effectively safeguarding sensitive operations.</td>
																</tr>
															</table>
														</blockquote>
													</details>
													<!-- controller Submodule -->
													<details>
														<summary><b>controller</b></summary>
														<blockquote>
															<div class='directory-path' style='padding: 8px 0; color: #666;'>
																<code><b>⦿ src.main.java.org.hack337.gptchat.controller</b></code>
															<table style='width: 100%; border-collapse: collapse;'>
															<thead>
																<tr style='background-color: #f8f9fa;'>
																	<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
																	<th style='text-align: left; padding: 8px;'>Summary</th>
																</tr>
															</thead>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='ChatWebUI/blob/master/src\main\java\org\hack337\gptchat\controller\AuthController.java'>AuthController.java</a></b></td>
																	<td style='padding: 8px;'>- AuthController facilitates user authentication and registration within the gptchat application<br>- It exposes endpoints for logging in and registering users, ensuring secure interaction with the authentication system<br>- By managing valid requests and responding with appropriate status codes, it enhances user experience while leveraging the underlying AuthService for handling authentication logic<br>- This component plays a critical role in the overall architecture by managing user access and security.</td>
																</tr>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='ChatWebUI/blob/master/src\main\java\org\hack337\gptchat\controller\ChatApiController.java'>ChatApiController.java</a></b></td>
																	<td style='padding: 8px;'>- ChatApiController facilitates user interactions within the chat application by managing chat sessions and message exchanges<br>- It enables users to initiate new chats, retrieve their existing chats and messages, send new messages, and edit or regenerate responses<br>- This controller serves as the backbone of the chat functionality, ensuring a seamless experience while engaging users with conversations in a responsive and dynamic manner.</td>
																</tr>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='ChatWebUI/blob/master/src\main\java\org\hack337\gptchat\controller\ChatWebController.java'>ChatWebController.java</a></b></td>
																	<td style='padding: 8px;'>- ChatWebController orchestrates user interaction within the app by managing the routing for login, registration, and chat functionalities<br>- It integrates user and chat services to retrieve and present user-specific data, ensuring a seamless experience in navigating the chat interface<br>- By leveraging Springs MVC architecture, it serves as the central hub for handling user authentication and chat-related operations.</td>
																</tr>
															</table>
														</blockquote>
													</details>
													<!-- dto Submodule -->
													<details>
														<summary><b>dto</b></summary>
														<blockquote>
															<div class='directory-path' style='padding: 8px 0; color: #666;'>
																<code><b>⦿ src.main.java.org.hack337.gptchat.dto</b></code>
															<table style='width: 100%; border-collapse: collapse;'>
															<thead>
																<tr style='background-color: #f8f9fa;'>
																	<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
																	<th style='text-align: left; padding: 8px;'>Summary</th>
																</tr>
															</thead>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='ChatWebUI/blob/master/src\main\java\org\hack337\gptchat\dto\AuthRequest.java'>AuthRequest.java</a></b></td>
																	<td style='padding: 8px;'>- AuthRequest serves as a Data Transfer Object (DTO) within the gptchat application, encapsulating user authentication data, specifically email and password<br>- It ensures that the provided email adheres to a valid format and that both fields are not left blank, thereby enforcing essential validation rules<br>- This functionality streamlines the process of user authentication, facilitating secure login operations across the entire codebase architecture.</td>
																</tr>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='ChatWebUI/blob/master/src\main\java\org\hack337\gptchat\dto\ChatDto.java'>ChatDto.java</a></b></td>
																	<td style='padding: 8px;'>- ChatDto serves as a data transfer object within the project, encapsulating essential information about a chat session<br>- It includes attributes such as the chats unique identifier, the associated user ID, the creation timestamp, and a collection of messages<br>- This model facilitates communication between different layers of the application, ensuring that chat-related data is structured and easily manageable throughout the codebase architecture.</td>
																</tr>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='ChatWebUI/blob/master/src\main\java\org\hack337\gptchat\dto\EditMessageRequest.java'>EditMessageRequest.java</a></b></td>
																	<td style='padding: 8px;'>- Facilitates the editing of message content within the chat application by defining the structure for edit message requests<br>- Ensures that any content submitted is validated to prevent blank messages, enhancing the overall integrity and user experience of the messaging system<br>- This DTO plays a crucial role in maintaining robust communication within the projects architecture.</td>
																</tr>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='ChatWebUI/blob/master/src\main\java\org\hack337\gptchat\dto\GptApiResponse.java'>GptApiResponse.java</a></b></td>
																	<td style='padding: 8px;'>- GptApiResponse serves as a data transfer object within the GPT chat application, encapsulating the response structure received from the GPT API<br>- It ensures seamless integration by handling various properties, including usage statistics and response choices, while robustly managing potential changes in the API<br>- This class also provides a method to extract the content of the first response choice, enhancing usability in the overall architecture.</td>
																</tr>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='ChatWebUI/blob/master/src\main\java\org\hack337\gptchat\dto\GptRequest.java'>GptRequest.java</a></b></td>
																	<td style='padding: 8px;'>- GptRequest serves as a data transfer object that encapsulates the essential parameters for making requests to the GPT model<br>- It defines the model type and contains a list of message payloads, each representing user, assistant, or system interactions<br>- This structure facilitates the seamless exchange of information within the broader architecture of the GPT chat application, enabling effective communication and data handling.</td>
																</tr>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='ChatWebUI/blob/master/src\main\java\org\hack337\gptchat\dto\GptResponse.java'>GptResponse.java</a></b></td>
																	<td style='padding: 8px;'>- Facilitates the representation of responses generated by the GPT model within the application<br>- Leveraging data annotations, it defines a structure that includes the answer and its type, ensuring consistency across the codebase<br>- This DTO (Data Transfer Object) plays a crucial role in managing the communication between various components, enhancing the overall data handling and response management in the projects architecture.</td>
																</tr>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='ChatWebUI/blob/master/src\main\java\org\hack337\gptchat\dto\JwtResponse.java'>JwtResponse.java</a></b></td>
																	<td style='padding: 8px;'>- JwtResponse serves as a data transfer object that encapsulates the JSON Web Token (JWT) response structure within the application<br>- It provides essential information, including the generated access token and its type, supporting secure user authentication and authorization workflows<br>- This object is integral to the codebase architecture, facilitating efficient communication between client and server during the authentication process.</td>
																</tr>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='ChatWebUI/blob/master/src\main\java\org\hack337\gptchat\dto\MessageDto.java'>MessageDto.java</a></b></td>
																	<td style='padding: 8px;'>- MessageDto serves as a Data Transfer Object within the GPT Chat application architecture, encapsulating essential attributes of a chat message, including its unique identifier, associated chat ID, user role, textual content, and timestamp<br>- This structure facilitates efficient data handling between different layers of the application, promoting clean interactions and maintaining consistency in message representation throughout the system.</td>
																</tr>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='ChatWebUI/blob/master/src\main\java\org\hack337\gptchat\dto\RegisterRequest.java'>RegisterRequest.java</a></b></td>
																	<td style='padding: 8px;'>- RegisterRequest serves as a data transfer object within the GPT Chat application, facilitating user registration by encapsulating essential user information<br>- It ensures that the provided email is valid and not blank while enforcing password length requirements<br>- This validation mechanism plays a crucial role in maintaining data integrity and enhancing security across the applications user registration process.</td>
																</tr>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='ChatWebUI/blob/master/src\main\java\org\hack337\gptchat\dto\SendMessageResponse.java'>SendMessageResponse.java</a></b></td>
																	<td style='padding: 8px;'>- Defines a data transfer object for encapsulating the response from the message-sending functionality within the GPT Chat application<br>- It facilitates the exchange of user and assistant messages, streamlining communication between different components of the system<br>- This structure enhances code readability and maintainability, ensuring a clear representation of the interaction outcomes in the broader architecture.</td>
																</tr>
															</table>
														</blockquote>
													</details>
													<!-- entity Submodule -->
													<details>
														<summary><b>entity</b></summary>
														<blockquote>
															<div class='directory-path' style='padding: 8px 0; color: #666;'>
																<code><b>⦿ src.main.java.org.hack337.gptchat.entity</b></code>
															<table style='width: 100%; border-collapse: collapse;'>
															<thead>
																<tr style='background-color: #f8f9fa;'>
																	<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
																	<th style='text-align: left; padding: 8px;'>Summary</th>
																</tr>
															</thead>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='ChatWebUI/blob/master/src\main\java\org\hack337\gptchat\entity\Chat.java'>Chat.java</a></b></td>
																	<td style='padding: 8px;'>- Defines the Chat entity within the GPT Chat application, representing a conversation linked to a specific user<br>- It automatically tracks the creation timestamp and maintains a list of associated messages, ensuring a structured and persistent storage of chat interactions<br>- This entity plays a crucial role in managing user conversations, contributing to the overall functionality of the chat system as part of the project’s architecture.</td>
																</tr>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='ChatWebUI/blob/master/src\main\java\org\hack337\gptchat\entity\Message.java'>Message.java</a></b></td>
																	<td style='padding: 8px;'>- Defines the Message entity, representing a conversation entry within the GPT Chat application<br>- It establishes relationships to the Chat entity and ensures validation of required fields<br>- By capturing the message content, associated role, and creation timestamp, this entity plays a crucial role in managing user interactions and maintaining the integrity of chat histories in the overall architecture of the project.</td>
																</tr>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='ChatWebUI/blob/master/src\main\java\org\hack337\gptchat\entity\Role.java'>Role.java</a></b></td>
																	<td style='padding: 8px;'>- Defines a set of roles within the application, specifically User, Assistant, and System<br>- These roles are integral to the overall architecture of the project, facilitating clear distinctions between different entities that interact within the chat applications ecosystem<br>- The designated roles guide behavior and permissions, ensuring an organized flow of interactions and enhancing the user experience within the system.</td>
																</tr>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='ChatWebUI/blob/master/src\main\java\org\hack337\gptchat\entity\User.java'>User.java</a></b></td>
																	<td style='padding: 8px;'>- User entity models the application’s user, encapsulating essential attributes such as email, password, and timestamp information for creation and last login<br>- It ensures email uniqueness and enforces validation for important fields<br>- Additionally, it establishes a relationship with the chat entities, allowing for efficient retrieval and management of user-specific chat data<br>- This architecture supports user authentication and interaction within the broader chat application framework.</td>
																</tr>
															</table>
														</blockquote>
													</details>
													<!-- exception Submodule -->
													<details>
														<summary><b>exception</b></summary>
														<blockquote>
															<div class='directory-path' style='padding: 8px 0; color: #666;'>
																<code><b>⦿ src.main.java.org.hack337.gptchat.exception</b></code>
															<table style='width: 100%; border-collapse: collapse;'>
															<thead>
																<tr style='background-color: #f8f9fa;'>
																	<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
																	<th style='text-align: left; padding: 8px;'>Summary</th>
																</tr>
															</thead>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='ChatWebUI/blob/master/src\main\java\org\hack337\gptchat\exception\GlobalExceptionHandler.java'>GlobalExceptionHandler.java</a></b></td>
																	<td style='padding: 8px;'>- GlobalExceptionHandler encompasses the core functionality for centralized exception handling within the application, ensuring that all error scenarios are managed consistently<br>- It processes various exceptions such as resource not found, validation failures, authentication issues, and access denials, providing structured responses with relevant details<br>- This enhances the overall user experience by delivering meaningful feedback for errors encountered during API interactions.</td>
																</tr>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='ChatWebUI/blob/master/src\main\java\org\hack337\gptchat\exception\ResourceNotFoundException.java'>ResourceNotFoundException.java</a></b></td>
																	<td style='padding: 8px;'>- ResourceNotFoundException serves as a custom exception within the projects architecture, specifically designed to handle scenarios where requested resources are not found<br>- By integrating with Springs response status management, it ensures that users receive appropriate HTTP NOT FOUND responses<br>- This enhances the overall reliability and user experience of the application by providing meaningful feedback during operations that involve resource retrieval.</td>
																</tr>
															</table>
														</blockquote>
													</details>
													<!-- repository Submodule -->
													<details>
														<summary><b>repository</b></summary>
														<blockquote>
															<div class='directory-path' style='padding: 8px 0; color: #666;'>
																<code><b>⦿ src.main.java.org.hack337.gptchat.repository</b></code>
															<table style='width: 100%; border-collapse: collapse;'>
															<thead>
																<tr style='background-color: #f8f9fa;'>
																	<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
																	<th style='text-align: left; padding: 8px;'>Summary</th>
																</tr>
															</thead>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='ChatWebUI/blob/master/src\main\java\org\hack337\gptchat\repository\ChatRepository.java'>ChatRepository.java</a></b></td>
																	<td style='padding: 8px;'>- Facilitates the management and retrieval of chat data within the application by providing essential query methods that connect chat entities with their associated users<br>- This interface enables the seamless fetching of chat records, supports ordering by creation date, and allows for the inclusion of messages when accessing specific chats<br>- It plays a critical role in enhancing the overall functionality of the chat feature in the system.</td>
																</tr>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='ChatWebUI/blob/master/src\main\java\org\hack337\gptchat\repository\MessageRepository.java'>MessageRepository.java</a></b></td>
																	<td style='padding: 8px;'>- Provides a repository interface for managing Message entities within the application<br>- It leverages Spring Data JPA to facilitate CRUD operations, ensuring seamless data persistence and retrieval<br>- This functionality is crucial for the overall architecture, enabling effective communication storage and access, thereby supporting the applications core purpose of facilitating chat interactions.</td>
																</tr>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='ChatWebUI/blob/master/src\main\java\org\hack337\gptchat\repository\UserRepository.java'>UserRepository.java</a></b></td>
																	<td style='padding: 8px;'>- UserRepository serves as a crucial component of the project by providing an interface for data access and manipulation related to User entities<br>- Through its methods, it facilitates retrieval and verification of users based on email addresses, thereby enhancing user management capabilities within the broader architecture<br>- This repository plays a vital role in ensuring seamless integration with the database, supporting efficient user-related operations in the application.</td>
																</tr>
															</table>
														</blockquote>
													</details>
													<!-- security Submodule -->
													<details>
														<summary><b>security</b></summary>
														<blockquote>
															<div class='directory-path' style='padding: 8px 0; color: #666;'>
																<code><b>⦿ src.main.java.org.hack337.gptchat.security</b></code>
															<table style='width: 100%; border-collapse: collapse;'>
															<thead>
																<tr style='background-color: #f8f9fa;'>
																	<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
																	<th style='text-align: left; padding: 8px;'>Summary</th>
																</tr>
															</thead>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='ChatWebUI/blob/master/src\main\java\org\hack337\gptchat\security\JwtAuthenticationFilter.java'>JwtAuthenticationFilter.java</a></b></td>
																	<td style='padding: 8px;'>- JwtAuthenticationFilter serves as a vital component in the security architecture of the application by managing JSON Web Token (JWT) validation and user authentication<br>- It intercepts HTTP requests to extract and verify JWTs, subsequently updating the security context with user authentication details<br>- This process ensures secure access control, thereby enhancing the overall protection of the applications resources against unauthorized access.</td>
																</tr>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='ChatWebUI/blob/master/src\main\java\org\hack337\gptchat\security\JwtTokenProvider.java'>JwtTokenProvider.java</a></b></td>
																	<td style='padding: 8px;'>- JwtTokenProvider facilitates secure user authentication and authorization within the application by managing JSON Web Tokens (JWTs)<br>- It generates tokens based on user credentials, validates them, and extracts user information from the tokens<br>- By resolving tokens from HTTP requests, it ensures that only authenticated users can access protected resources, thereby enhancing the overall security architecture of the codebase.</td>
																</tr>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='ChatWebUI/blob/master/src\main\java\org\hack337\gptchat\security\UserDetailsServiceImpl.java'>UserDetailsServiceImpl.java</a></b></td>
																	<td style='padding: 8px;'>- Facilitates user authentication and management within the application by implementing the UserDetailsService interface<br>- It retrieves user information from the database based on email or user ID, ensuring secure identification during login processes<br>- By encapsulating user data and roles, it supports the overarching security architecture of the project, enabling reliable user authorization and access control.</td>
																</tr>
															</table>
														</blockquote>
													</details>
													<!-- service Submodule -->
													<details>
														<summary><b>service</b></summary>
														<blockquote>
															<div class='directory-path' style='padding: 8px 0; color: #666;'>
																<code><b>⦿ src.main.java.org.hack337.gptchat.service</b></code>
															<table style='width: 100%; border-collapse: collapse;'>
															<thead>
																<tr style='background-color: #f8f9fa;'>
																	<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
																	<th style='text-align: left; padding: 8px;'>Summary</th>
																</tr>
															</thead>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='ChatWebUI/blob/master/src\main\java\org\hack337\gptchat\service\AuthService.java'>AuthService.java</a></b></td>
																	<td style='padding: 8px;'>- AuthService serves as a critical component of the authentication system within the project architecture, facilitating user registration and login processes<br>- It ensures secure management of user credentials, confirming the uniqueness of email addresses during registration and generating JWT tokens upon successful login<br>- Additionally, it tracks user activity by updating login timestamps, enhancing overall security and user experience.</td>
																</tr>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='ChatWebUI/blob/master/src\main\java\org\hack337\gptchat\service\ChatService.java'>ChatService.java</a></b></td>
																	<td style='padding: 8px;'>- ChatService orchestrates the core functionalities of the chat application, enabling users to initiate new chats, retrieve their chat histories, and interact with a conversational AI<br>- By managing message exchanges, including sending and regenerating user and assistant messages, it ensures a seamless communication experience<br>- Its integration with repositories and user services underpins a robust architecture that prioritizes user engagement and interaction with AI-driven responses.</td>
																</tr>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='ChatWebUI/blob/master/src\main\java\org\hack337\gptchat\service\GptService.java'>GptService.java</a></b></td>
																	<td style='padding: 8px;'>- GptService facilitates interaction with a GPT API, enabling the retrieval of AI-generated responses based on user chat history<br>- By assembling requests from stored messages and handling API communication, it ensures seamless integration of AI capabilities into the application<br>- This service enhances user experience by providing dynamic and contextually relevant responses, ultimately contributing to the projects goal of enabling intelligent chat interactions.</td>
																</tr>
																<tr style='border-bottom: 1px solid #eee;'>
																	<td style='padding: 8px;'><b><a href='ChatWebUI/blob/master/src\main\java\org\hack337\gptchat\service\UserService.java'>UserService.java</a></b></td>
																	<td style='padding: 8px;'>- UserService provides functionality to retrieve the currently authenticated user within the application<br>- It leverages Spring Security to access user authentication details and fetches user information from the UserRepository by their email<br>- By encapsulating this logic, the service simplifies user management and enhances the overall architecture of the application, ensuring secure access to user data throughout the project.</td>
																</tr>
															</table>
														</blockquote>
													</details>
												</blockquote>
											</details>
										</blockquote>
									</details>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<!-- resources Submodule -->
					<details>
						<summary><b>resources</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ src.main.resources</b></code>
							<!-- templates Submodule -->
							<details>
								<summary><b>templates</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ src.main.resources.templates</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='ChatWebUI/blob/master/src\main\resources\templates\chat.html'>chat.html</a></b></td>
											<td style='padding: 8px;'>- Chat HTML template facilitates user interaction in the ChatApp by providing a dynamic and visually engaging interface<br>- It features a sidebar for chat navigation, a message display area, and input controls for sending messages<br>- Enhanced with Tailwind CSS and jQuery, this template streamlines the chat experience, enabling real-time communication and user management, which is integral to the overall structure of the application.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='ChatWebUI/blob/master/src\main\resources\templates\login.html'>login.html</a></b></td>
											<td style='padding: 8px;'>- Facilitating user authentication for ChatApp, the login HTML template provides a user-friendly interface for individuals to securely log in with their email and password<br>- Enhanced by responsive design and stylish components using Tailwind CSS and animations, it also directs new users to the registration page, ensuring a seamless transition between account creation and access, contributing to the overall robustness of the applications user experience.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='ChatWebUI/blob/master/src\main\resources\templates\register.html'>register.html</a></b></td>
											<td style='padding: 8px;'>- Facilitates user registration for the ChatApp by providing an intuitive, responsive HTML form<br>- Users can input their email, password, and password confirmation, ensuring a streamlined onboarding experience<br>- Includes client-side validation and user feedback for error handling and success messaging<br>- Positioned within the templates directory, it integrates seamlessly into the broader application architecture, enhancing user interaction and accessibility.</td>
										</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
				</blockquote>
			</details>
		</blockquote>
	</details>
</details>

---

## Getting Started

### Prerequisites

This project requires the following dependencies:

- **Programming Language:** Java
- **Package Manager:** Gradle

### Installation

Build ChatWebUI from the source and intsall dependencies:

1. **Clone the repository:**

    ```sh
    ❯ git clone https://github.com/y9hack337/ChatWebUI
    ```

2. **Navigate to the project directory:**

```sh
❯ cd ChatWebUI
```

3. **Install the dependencies:**

<!-- SHIELDS BADGE CURRENTLY DISABLED -->
<!-- [![gradle][gradle-shield]][gradle-link] -->
<!-- REFERENCE LINKS -->
<!-- [gradle-shield]: https://img.shields.io/badge/Gradle-02303A.svg?style={badge_style}&logo=gradle&logoColor=white -->
<!-- [gradle-link]: https://gradle.org/ -->

```sh
❯ gradle build
```

### Usage

Run the project with:
```sh
gradle run
```

### Testing

Chatwebui uses the {__test_framework__} test framework. Run the test suite with:
```sh
gradle test
```

---

## Contributing

- **💬 [Join the Discussions](https://github.com/y9hack337/ChatWebUI/discussions)**: Share your insights, provide feedback, or ask questions.
- **🐛 [Report Issues](https://github.com/y9hack337/ChatWebUI/issues)**: Submit bugs found or log feature requests for the `ChatWebUI` project.

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com/y9hack337/ChatWebUI/graphs/contributors">
      <img src="https://contrib.rocks/image?repo=y9hack337/ChatWebUI">
   </a>
</p>
</details>

[![][back-to-top]](#top)

</div>


[back-to-top]: https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square


---
