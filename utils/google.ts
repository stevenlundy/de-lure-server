import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
);

oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const refreshToken = async () => {
    const response = await oauth2Client.refreshAccessToken();
    oauth2Client.setCredentials(response.credentials);
}
refreshToken();

const youtube = google.youtube({
    version: 'v3',
    auth: oauth2Client,
});

export { youtube };
