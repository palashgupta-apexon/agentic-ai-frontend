import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
const metaData = {
  token: 'random-token', //localStorage.getItem('access_token')
  user_name: 'random-user-name',
  user_email: 'user@apexon.com'
}

export const getTools = async () => {
  const url = `${baseUrl}/tools/`;
  const response = await axios.post(url, metaData);
  return response.data;
}

export const getToolByName = async (toolId: string | number) => {
  const url = `${baseUrl}/tools/tool-name`;
  const data = {...metaData, id: toolId}
  const response = await axios.post(url, data);
  return response.data;
}

export const fileUploadForTool = async () => {
  
}