import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() { }

    private state$ = new Subject();
    private clients: HTMLElement[] = [];

    public registerClient(client: HTMLElement) {
        this.clients.push(client);
    }

    public unregisterClient(client : HTMLElement){
        console.log('before unregistering ..',this.clients);
        let index = this.clients.indexOf(client);
        this.clients.splice(index,1);
        console.log('after unregistering ..',this.clients);
    }

    public setState(state: string) {
        for(let client of this.clients) {
            client.setAttribute('state', state);
        }
    }
}
