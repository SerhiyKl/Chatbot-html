const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
  // Create a chat <li> element with passed message and className
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", `${className}`);
  let chatContent =
    className === "outgoing"
      ? `<p></p>`
      : `<span class="material-symbols-outlined">account_circle</span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi; // return chat <li> element
};

const generateResponse = (chatElement) => {
//    const API_URL = "http://localhost:5000";
  const API_URL = "https://Serhii111.pythonanywhere.com";
  const API_KEY = "My-secret-key";
  const messageElement = chatElement.querySelector("p");

  // Send POST request to API, get response and set the response as paragraph text
  //    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {

  let userMessageModify = userMessage.replaceAll("#", "1q2q3q");
  userMessageModify = userMessageModify.replaceAll("/", "1a2a3a");
  userMessageModify = userMessageModify.replaceAll("&", "1b2b3b");
  userMessageModify = userMessageModify.replaceAll("?", "!!!@@@");

  fetch(API_URL + "/get/" + userMessageModify + "?api-key=" + API_KEY)
    .then((res) => res.json())
    .then((data) => {
      //   fetch(API_URL + "/get?msg=" + userMessage).then((res) => res.json()).then((data) => {
      //      console.log(data);
      //      messageElement.textContent = data.cafes[0].name.trim();
      messageElement.textContent = data.trim();
    })
    .catch(() => {
      messageElement.classList.add("error");
      messageElement.textContent =
        "Oops! Something went wrong. Please try again.";
      //        console.log(data);
    })
    .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
};

const handleChat = () => {

  userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
  if (!userMessage) return;

  // Clear the input textarea and set its height to default
  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;

  // Append the user's message to the chatbox
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
    // Display "Thinking..." message while waiting for the response
    const incomingChatLi = createChatLi("Thinking...", "incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    generateResponse(incomingChatLi);
  }, 600);
    document.getElementById("input=field").focus()

};

chatInput.addEventListener("input", () => {
  // Adjust the height of the input textarea based on its content
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  // If Enter key is pressed without Shift key and the window
  // width is greater than 800px, handle the chat
  //  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
  if (e.key === "Enter" && (e.shiftKey || e.ctrlKey)) {
    e.preventDefault();
    handleChat();
  }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () =>
  document.body.classList.remove("show-chatbot")
);
chatbotToggler.addEventListener("click", () =>{
  document.body.classList.toggle("show-chatbot")
  document.getElementById("input=field").focus()
}
);
