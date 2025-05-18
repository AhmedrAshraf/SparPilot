import { ChatMessage } from '../types/chat';

interface GPTResponse {
  choices?: Array<{
    message?: {
      content: string;
    };
  }>;
  error?: {
    message: string;
    type?: string;
  };
}

export async function askGPT(messages: ChatMessage[]): Promise<string> {
  try {
    const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;

    if (!apiKey) {
      console.error('OpenAI API key not configured');
      return 'API-Schlüssel fehlt. Bitte stelle sicher, dass der OpenAI API-Schlüssel korrekt konfiguriert ist.';
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey.trim()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo-preview',
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        temperature: 0.7,
      }),
    });

    if (response.status === 401) {
      console.error('Ungültiger API-Schlüssel');
      return 'Der API-Schlüssel ist ungültig oder abgelaufen. Bitte überprüfe deine Konfiguration.';
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API Fehler:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });
      return `Entschuldigung, es gab einen Fehler bei der Kommunikation mit dem Server (${response.status}). Bitte versuche es später noch einmal.`;
    }

    const data: GPTResponse = await response.json();

    if (data.error) {
      console.error('Antwortfehler:', data.error);
      return `Entschuldigung, es gab einen Fehler in der Antwort: ${data.error.message}`;
    }

    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      console.error('Ungültige Antwortstruktur:', data);
      return 'Entschuldigung, ich konnte keine gültige Antwort generieren. Bitte versuche es noch einmal.';
    }

    return content;

  } catch (err) {
    console.error('Unerwarteter Fehler:', err);
    return 'Entschuldigung, es ist ein unerwarteter Fehler aufgetreten. Bitte versuche es später noch einmal.';
  }
}