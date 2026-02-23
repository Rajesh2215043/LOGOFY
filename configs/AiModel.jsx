const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const AIDesignIdea = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: 'Based on Logo of type Modern Mascot Logos Generate a text prompt to create Logo for Logo title/Brand name : SKM tech with decription: tech company and refering to prompt:       "A vibrant logo featuring a friendly, animated character with a playful expression. The character is dressed in a classic uniform, complete with a distinctive accessory that adds personality. In one hand, they hold a signature item that represents the brand, while the other elements of the design—such as small decorative touches or natural accents—enhance the overall look. The background consists of a bold, circular design with subtle accents to highlight the character. Below, the brand name is displayed in bold, stylized lettering, with a slight curve and complementary decorative lines. The overall style is fun, welcoming, and full of character.",\n. Give me 4/5 Suggestion of logo idea (each idea with maximum 4-5 words), Result in JSON format",\n',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: 'Okay, I understand. You want me to create a text prompt to generate a modern mascot logo for "SKM Tech" (a tech company), based on a provided description. Then, I should give you 4-5 logo ideas, each described in 4-5 words, all in JSON format.\n\nHere\'s the JSON output:\n\n```json\n{\n  "prompt": "Create a modern mascot logo for SKM Tech, a tech company. The logo should feature a vibrant, friendly, animated character with a playful expression. The character could be a stylized robot, a tech-savvy animal, or a futuristic figure. The character should hold a device representing technology innovation, such as a microchip, a circuit board, or a glowing orb. The background should be a bold, circular design with tech-related accents like binary code or stylized network connections. The brand name \'SKM Tech\' should be displayed below in bold, stylized lettering with a slight curve and complementary decorative lines that evoke a sense of technological advancement. The overall style is fun, welcoming, and full of character, conveying innovation and approachability.",\n  "logo_ideas": [\n    "Robot mascot holding chip",\n    "Tech-savvy fox with circuits",\n    "Futuristic figure with orb",\n    "Smiling robot with binary code",\n    "Animated gear character waving"\n  ]\n}\n```\n',
        },
      ],
    },
  ],
});

export const AILogoPrompt = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generated Prompt: Generate a text prompt to create Logo for Logo Title/Brand name : BGMI,with description: a AAA open world games, with Color combination of #212121, #00bcd4, #673ab7, #ff5722, #8bc34a, also include the Let AI Select the best idea and include Black And White Line Logos design idea and Referring to this Logo Prompt:Create a minimalist and modern logo design that is clean, simple, and visually appealing. The logo should be easy to recognize and remember, and it should be versatile enough to be used in a variety of contexts. Use a combination of typography and simple geometric shapes to create a visually striking and memorable design. The logo should be timeless and elegant, and it should convey a sense of professionalism and sophistication.  Give me result in JSON portal with prompt field only",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "prompt": "Create a minimalist and modern logo design for \'BGMI\' (AAA open world games). The logo should be clean, simple, visually appealing, and easy to recognize and remember. It should be versatile enough for various contexts. Utilize a combination of typography and simple geometric shapes to create a visually striking and memorable design. The logo should be timeless, elegant, and convey professionalism and sophistication. Use the color palette: #212121 (dark grey), #00bcd4 (cyan), #673ab7 (deep purple), #ff5722 (deep orange), #8bc34a (light green).  Include a Black And White Line Logos design idea in the submission. Let AI select the best concept."\n}\n```\n',
        },
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
