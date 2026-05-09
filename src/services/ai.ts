import { ResultType } from "./types";

export async function getRoast(scenario: string, choice: string, resultType: ResultType): Promise<string> {
  try {
    const response = await fetch('/api/roast', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scenario, choice, resultType })
    });
    
    if (!response.ok) throw new Error('Roast Master is out of coffee.');
    
    const data = await response.json();
    return data.roast;
  } catch (error) {
    console.error(error);
    return "Roast Master is speechless. (Check your connection, bestie!)";
  }
}
