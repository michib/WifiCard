import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'WifiImage';

  wifi$: Observable<string> = of('test');

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    const initial = {
      ssid: 'Router',
      password: 'Password123'
    };
    this.form = this.formBuilder.group(initial);

    this.wifi$ = this.form.valueChanges.pipe(
      startWith(initial),
      map(this.mapToWifi)
    );
  }

  private mapToWifi(value: { ssid: string, password: string}): string {
    return `WIFI:T:WPA;S:${value.ssid};P:${value.password};;`;
  }
}
