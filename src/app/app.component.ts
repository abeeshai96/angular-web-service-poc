import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { XMLParser } from 'fast-xml-parser';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'angular-web-service';
  private url = '/api/csp/samples/SOAP.Demo.cls?soap_method=AddInteger&Arg1=1&Arg2=1';
  xmlData: any;
  jsonData: any;


  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(`${this.url}`, { responseType: 'text' })
  }

  fetchData() {
    this.getData().subscribe({
      next: (response) => {
        this.xmlData = response;
        this.jsonData = JSON.stringify(this.convertXmlToJson(response));
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  convertXmlToJson(xml: string): any {
    const parser = new XMLParser();
    return parser.parse(xml);
  }
}
