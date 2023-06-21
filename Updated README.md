# AuthentiAI - An AI Powered Product Authentication Assistant

AuthentiAI will play a crucial role in enhancing customer trust by integrating with e-commerce platforms and retail businesses, ensuring the sale of authentic products, and protecting customers from counterfeit goods. This will lead to increased sales and improved brand reputation. Additionally, AuthentiAI will aid in intellectual property and brand protection by preventing counterfeit goods from damaging brand images.

With its multi-language support, AuthentiAI will enable businesses to expand their global reach and cater to audiences from different regions and countries. The AI will also assist in supply chain management by verifying the authenticity of products throughout the distribution process.

AuthentiAI will support law enforcement and regulatory compliance efforts by helping identify and track counterfeit products in the market, reducing their prevalence, and ensuring adherence to regulations. The AI's accessibility and inclusivity features, such as voice assistance and multi-language support, will cater to diverse users, making product verification more accessible and inclusive.

Lastly, AuthentiAI will streamline customer support by integrating with existing support systems, reducing the workload on human agents and leading to faster response times and increased customer satisfaction.

Please visit [AuthentiAI](https://authenti-ai.netlify.app/) for more information.

## Objective:
The objective of our solution is to develop an AI-powered assistive chatbot, AuthentiAI, that helps users and businesses verify the authenticity of their products by guiding them through the verification process, providing accessibility features, providing extensibility, integrating seamlessly with Ennoventure’s existing verification service.

## Implementation:
1. UI Design and Implementation: We will use React with Vite, Chatscope UI Kit, and Firebase for creating a simple and intuitive chat interface. Barcode scanning will be implemented using Scandit, while voice command input and text-to-speech output will be achieved using Text-to-Speech API and react-speech-recognition library. Progress indicators, multi-language support, personalized greeting, a user history display, and a feedback system will also be incorporated.

2. Chatbot architecture: Our hybrid chatbot model will consist of a Rule-based chatbot and an AI chatbot. The Rule-based chatbot, implemented using the RASA framework, will handle product verification and barcode scanning. The AI chatbot will use natural language processing techniques like Transformers and LLMs (ChatGPT, Google Bard) to provide voice assistance, NLP capabilities, multi-language support, personalization, and conversation flow.

3. Testing and Evaluation: The hybrid chatbot model will be continuously tested and evaluated to ensure effectiveness and accuracy, with improvements based on user feedback.

To implement chatbot analytics for AuthentiAI, first define KPIs to measure performance. Collect data from user interactions across platforms and store it in a secure cloud-based database. Process the data to extract insights and generate reports based on KPIs using data processing tools. Visualize the processed data with data visualization tools or Python libraries. Apply machine learning algorithms to analyze user feedback and improve the chatbot's performance. Finally, integrate the analytics system with AuthentiAI for real-time monitoring and continuous improvement.

![Login](https://github.com/rajeshpanjiyar/AuthentiAI-web/assets/78999467/9877662a-1813-4052-887a-9f8d0804ff48)

<img width="1440" alt="Screenshot 2023-06-21 at 5 58 09 PM" src="https://github.com/rajeshpanjiyar/AuthentiAI-web/assets/78999467/634b204b-0a8b-4ada-a817-21b5e7a4435d">

![Chat](https://github.com/rajeshpanjiyar/AuthentiAI-web/assets/78999467/784256d6-29b3-45d6-90f4-e77f72a61e02)


![About us](https://github.com/rajeshpanjiyar/AuthentiAI-web/assets/78999467/3664e139-1ad1-487a-8c90-2653c8a8723c)

![Authenticate](https://github.com/rajeshpanjiyar/AuthentiAI-web/assets/78999467/8bbe607e-afdf-4796-be6a-88eb5df49587)

![Genuine](https://github.com/rajeshpanjiyar/AuthentiAI-web/assets/78999467/89444aed-8d39-4e05-9f87-7063c0178294)

![Fake](https://github.com/rajeshpanjiyar/AuthentiAI-web/assets/78999467/010fe7a2-b462-4ecb-9293-d46d1675766b)

<img width="1440" alt="Screenshot 2023-06-21 at 5 58 24 PM" src="https://github.com/rajeshpanjiyar/AuthentiAI-web/assets/78999467/85e254fd-1622-4517-8b9c-0508074badd5">

<img width="1440" alt="Screenshot 2023-06-21 at 5 58 49 PM" src="https://github.com/rajeshpanjiyar/AuthentiAI-web/assets/78999467/ec2ef4ae-89e1-4a65-8612-c24e71b3bca9">


### Help and Support Page :

The ‘Help and Support’ Page within the web app will serve as a comprehensive resource to assist users in resolving their queries and addressing any issues they may encounter. This dedicated page provides a user-friendly interface designed to facilitate a seamless support experience.
Contact Form: A contact form on this page that allows users to submit inquiries related to integration or other support issues, will be implemented. The form should collect the user's name, email address, and a description of their inquiry. A CAPTCHA will be included to prevent spam submissions.

![Support](https://github.com/rajeshpanjiyar/AuthentiAI-web/assets/78999467/2225375a-8e1e-4872-bd87-6a0fa889f331)


### FAQs and Updates Page :

FAQs Section will act as a Compilation list of frequently asked questions related to AuthentiAI's features, usage, and troubleshooting. The questions will be organized into categories for easy navigation. Clear and concise answers to each question will be provided, and links to relevant articles or resources when necessary will be added.
The ‘Updates’ Section will display the latest updates and announcements related to AuthentiAI. This can include new feature releases, bug fixes, and platform compatibility updates. Updates will be organized in chronological order, with the most recent update appearing at the top of the list. A brief description of each update, along with a link to a more detailed article or release notes if available, will be added as well.
Search Functionality using Search engine services like Algolia will be added at the top of the FAQs and Updates page to help users quickly find answers to their questions or locate specific updates.
Pagination: If the number of FAQs or updates is extensive, pagination to improve page load times and user experience will be implemented.

![Faq](https://github.com/rajeshpanjiyar/AuthentiAI-web/assets/78999467/65ceadf6-7a52-412d-a94d-a2039201beb9)


### Integrations :

To integrate our chatbot with popular messaging platforms like Facebook Messenger, WhatsApp, and Telegram, we plan to follow the below-mentioned steps:

First, we need to set up accounts on the messaging platforms we want to integrate with, such as WhatsApp Business API and Telegram Bot API. This involves creating developer accounts and obtaining the necessary API keys or access tokens.
Next, in our chatbot application, we need to configure a webhook or endpoint. This endpoint will be responsible for receiving incoming messages from the messaging platforms. We'll set it up to handle the incoming requests and process the messages accordingly.
Depending on the messaging platforms we want to integrate with, we'll need to implement platform-specific adapters. These adapters act as connectors between our chatbot application and the APIs of the messaging platforms. Each adapter will have its own methods and configurations for sending and receiving messages.
Once we receive a message from a messaging platform, we'll need to handle it appropriately. This involves parsing the incoming message payload to extract relevant information like the sender ID and message content. We'll then pass this information to our chatbot logic for processing. Our chatbot logic will generate a response based on the message content and any predefined conversational flows we've implemented.
After generating a response, we'll use the corresponding platform adapter to send the response back to the messaging platform. The response can include various types of messages, such as text, images, buttons, or any other supported message types based on the capabilities of the platform.

### Web Extension of our service: 
1 <img width="1440" alt="Screenshot 2023-06-18 at 10 39 46 PM" src="https://github.com/rajeshpanjiyar/AuthentiAI-web/assets/78999467/9c4f6c00-8a24-4faf-937a-2c75a461425f">

2 <img width="1440" alt="Screenshot 2023-06-18 at 10 40 06 PM" src="https://github.com/rajeshpanjiyar/AuthentiAI-web/assets/78999467/1cb9e576-72a9-4f45-8966-8f6075bc8319">

3 <img width="1440" alt="Screenshot 2023-06-18 at 10 40 47 PM" src="https://github.com/rajeshpanjiyar/AuthentiAI-web/assets/78999467/60273f45-48c1-4946-85c0-0d8b1b1ce381">

4 <img width="1440" alt="Screenshot 2023-06-18 at 10 40 53 PM" src="https://github.com/rajeshpanjiyar/AuthentiAI-web/assets/78999467/3b8701b7-f3f2-4009-8004-bb77886e99dc">

5 <img width="1440" alt="Screenshot 2023-06-18 at 10 41 05 PM" src="https://github.com/rajeshpanjiyar/AuthentiAI-web/assets/78999467/34dd67ee-6d5c-48b3-8419-0a8f831ff6a9">

<img width="1440" alt="Screenshot 2023-06-18 at 10 41 47 PM" src="https://github.com/rajeshpanjiyar/AuthentiAI-web/assets/78999467/b3906706-d644-41cd-8c75-3a7765069c9e">


## Final Result of the Idea:
The final result of our idea will be a highly efficient, user-friendly, and accessible AI-powered product authentication assistant/assistive chatbot that can be easily integrated into various platforms and industries.

The assistive chatbot will provide clear guidance on the steps required for verification, such as taking photos or inputting specific information about the product.

Additionally, the chatbot will be accessible to users with disabilities or impairments, ensuring that it can be used by a wide range of individuals. This also involves features such as text-to-speech, voice recognition, or compatibility with screen readers for visually impaired users, as well as accommodating users with limited mobility. Last but not least, it also offers multiple additional features such as barcode scanning, voice assistance, feedback mechanism, and natural language processing to enhance the user experience.

By providing a seamless experience and integrating with existing verification systems, AuthentiAI will become a valuable tool for customers, businesses, and brands to ensure product authenticity and reduce the prevalence of counterfeit goods.



## Future Scope of Improvements:
The future scope of improvements for AuthentiAI includes integrating more verification services and NFTs, implementing advanced image recognition, creating a community platform, providing humanitarian assistance, integrating with smart devices, and adding gamification elements. These enhancements aim to expand the range of products AuthentiAI can verify, improve accuracy, raise awareness, offer additional support, and make the verification process more engaging for users.

If time permits we will be following up with integrating the above-mentioned features.

## Constraints/Known Issues(that we might encounter) :
The accuracy of barcode scanning and product verification may be affected by factors such as image quality, lighting conditions, and barcode damage.
The capabilities of the chosen development platform and APIs may limit the chatbot's performance.
Ensuring data privacy and security for user information and preferences may require additional measures.
The effectiveness of NLP and machine translation may vary and may not always provide accurate or contextually appropriate responses.
Continuous monitoring and updates may be required to maintain the chatbot's performance and adapt to changes in product verification systems.
