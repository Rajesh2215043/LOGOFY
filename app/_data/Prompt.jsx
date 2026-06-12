// export default {
//   DESIGN_IDEA_PROMPT:
//     "Based on Logo of type {logoType} Generate a text prompt to create Logo for Logo title/Brand name : {logoTitle} with decription: {logoDesc} and refering to prompt: {logoPrompt}. Give me 5 Suggestion of logo idea (each idea with maximum 4-5 words), Result in JSON format",
//   LOGO_PROMPT:
//     "Generate a text prompt to create Logo for Logo Title/Brand name : {logoTitle},with description: {logoDesc}, with Color combination of {logoColor}, also include the {logoIdea} and include {logoDesign} design idea and Referring to this Logo Prompt:{logoPrompt}  Give me result in JSON portal with prompt field only",
// };
// export default {
//   DESIGN_IDEA_PROMPT:
//     "Based on Logo of type {logoType}, generate a text prompt to create a Logo for the Logo Title/Brand name: {logoTitle} with description: {logoDesc} and referring to prompt: {logoPrompt}. The logo must strictly adhere to the provided color palette and not use any other colors. Give me 5 suggestions for logo ideas (each idea with a maximum of 4-5 words). Result in JSON format.",
//   LOGO_PROMPT:
//     "Generate a text prompt to create a Logo for the Logo Title/Brand name: {logoTitle}, with description: {logoDesc}, and strictly follow the provided color combination of {logoColor}. Do not use any colors outside the specified color palette. Include the {logoIdea} and incorporate the {logoDesign} design idea while referring to this Logo Prompt: {logoPrompt}. Give me the result in JSON format with only the 'prompt' field.",
// };
// export default {
//   DESIGN_IDEA_PROMPT:
//     "Based on Logo of type {logoType}, generate a text prompt to create a Logo for the Logo Title/Brand name: {logoTitle} with description: {logoDesc} and referring to prompt: {logoPrompt}. The logo must strictly adhere to the provided color palette and not use any other colors. Only include a tagline if explicitly mentioned in the logo description; otherwise, do not add any random words or taglines—just use the logo name and design elements. Give me 5 suggestions for logo ideas (each idea with a maximum of 4-5 words). Result in JSON format.",
//   LOGO_PROMPT:
//     "Generate a text prompt to create a Logo for the Logo Title/Brand name: {logoTitle}, with description: {logoDesc}, and strictly follow the provided color combination of {logoColor}. Do not use any colors outside the specified color palette. Only include a tagline if explicitly mentioned in the logo description; otherwise, do not add any random words or taglines—just use the logo name and design elements. Include the {logoIdea} and incorporate the {logoDesign} design idea while referring to this Logo Prompt: {logoPrompt}. Give me the result in JSON format with only the 'prompt' field.",
// };
export default {
  DESIGN_IDEA_PROMPT:
    "Based on Logo of type {logoType}, generate a text prompt to create a Logo for the Logo Title/Brand name: {logoTitle} with description: {logoDesc} and referring to prompt: {logoPrompt}. The logo must strictly adhere to the provided color palette ({logoColor}) and not use any other colors. Only include a tagline if explicitly mentioned in the logo description; otherwise, do not add any random words or taglines—just use the logo name and design elements. Provide 5 creative logo ideas that incorporate the specified color palette, design style ({logoDesign}), and any specific themes or concepts from the description. Each idea should be concise (maximum 4-5 words) and directly inspired by the user's inputs. Result in JSON format.",
  LOGO_PROMPT:
    "Generate a text prompt to create a Logo for the Logo Title/Brand name: {logoTitle}, with description: {logoDesc}, and strictly follow the provided color combination of {logoColor}. Do not use any colors outside the specified color palette. Only include a tagline if explicitly mentioned in the logo description; otherwise, do not add any random words or taglines—just use the logo name and design elements. Include the {logoIdea} and incorporate the {logoDesign} design idea while referring to this Logo Prompt: {logoPrompt}. Ensure that the logo ideas are inspired by the user's inputs, such as the color palette, design style, and description. Give me the result in JSON format with only the 'prompt' field.",
};
