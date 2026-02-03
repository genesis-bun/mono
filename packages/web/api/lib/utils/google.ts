import { google } from "googleapis";

const SCOPES = [
	"https://www.googleapis.com/auth/meetings.space.created",
	"https://www.googleapis.com/auth/calendar.events",
	"https://www.googleapis.com/auth/drive.file",
];

export const getGoogleAuth = (subjectEmail: string) => {
	return new google.auth.JWT({
		email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
		key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
		scopes: SCOPES,
		subject: subjectEmail,
	});
};
