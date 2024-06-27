import gameVersion from "./gameVersion";
import type { Response } from "./modal"

class renewalSession {

    private readonly _token: string = Bun.env.TOKEN!;
    private readonly _baseURL: string = 'https://bser-rest-release.bser.io/api';

    private readonly _headers: HeadersInit = {
        'X-BSER-SessionKey': this._token,
        'X-BSER-Version': '1.24.0',
        'X-BSER-AuthProvider': 'STEAM',
        'User-Agent': 'BestHTTP/2 v2.4.0',
        'Content-Type': 'application/json',
    }

    public async start(): Promise<void> {
        try {
            const response = await fetch(this._baseURL + '/external/renewalSession', {
                method: 'POST',
                headers: this._headers,
            })
            const data: Response = await response.json();

            if (data.cod !== 200) return console.log('expired.token');
            console.log('[renewalSession] -> Updated Token!');
        } catch (e) {
            console.error(e)
        }
    }
}

setInterval(async () => await new renewalSession().start(), 1 * 60000);
