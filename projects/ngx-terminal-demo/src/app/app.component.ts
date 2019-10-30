import {Component} from '@angular/core';
import {TerminalPrompt} from '@henry781/ngx-terminal';
import {from, of} from 'rxjs';
import {concatMap, delay} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public server = 'localhost';
  public login = 'henry781';

  onCommand(prompt: TerminalPrompt) {
    switch (prompt.getCommand()) {

      case 'whoami':
        prompt.response = prompt.login;
        prompt.responseComplete();
        break;

      case 'smartphone':
        prompt.response = '<ul><li>Apple</li><li>Google</li><li>Samsung</li></ul>';
        prompt.responseComplete();
        break;

      case 'boot':
        const responseArr = [
          '[\u001b[0;32m  OK  \u001b[0m] Started Show Plymouth Boot Screen.',
          '[\u001b[0;32m  OK  \u001b[0m] Reached target Encrypted Volumes.',
          '[\u001b[0;32m  OK  \u001b[0m] Reached target Paths.',
          '[\u001b[0;32m  OK  \u001b[0m] Started Forward Password Requests to Plymouth Directory Watch.',
          '[\u001b[0;32m  OK  \u001b[0m] Found device /dev/serial1.',
          '[\u001b[0;32m  OK  \u001b[0m] Found device /dev/mmcblk0p1.',
          '         Starting File System Check on /dev/mmcblk0p1...',
          '[\u001b[0;32m  OK  \u001b[0m] Started File System Check on /dev/mmcblk0p1.',
          '         Mounting /boot...',
          '[\u001b[0;32m  OK  \u001b[0m] Mounted /boot.',
          '[\u001b[0;32m  OK  \u001b[0m] Listening on Load/Save RF Kill Switch Status /dev/rfkill Watch.',
          '[\u001b[0;32m  OK  \u001b[0m] Reached target Sound Card.',
          '[\u001b[0;32m  OK  \u001b[0m] Reached target Local File Systems.',
          '         Starting Set console font and keymap...',
          '         Starting Raise network interfaces...',
          '         Starting Preprocess NFS configuration...',
          '         Starting Create Volatile Files and Directories...',
          '         Starting Tell Plymouth To Write Out Runtime Data...',
          '[\u001b[0;32m  OK  \u001b[0m] Started Set console font and keymap.',
          '[\u001b[0;32m  OK  \u001b[0m] Started Tell Plymouth To Write Out Runtime Data.',
          '[\u001b[0;32m  OK  \u001b[0m] Started Preprocess NFS configuration.',
          '[\u001b[0;32m  OK  \u001b[0m] Reached target NFS client services.',
          '[\u001b[0;32m  OK  \u001b[0m] Started Create Volatile Files and Directories.',
          '         Starting RPC bind portmap service...',
          '         Starting Update UTMP about System Boot/Shutdown...',
          '[\u001b[0;32m  OK  \u001b[0m] Reached target System Time Synchronized.',
          '[\u001b[0;32m  OK  \u001b[0m] Started Update UTMP about System Boot/Shutdown.',
          '[\u001b[0;32m  OK  \u001b[0m] Reached target System Initialization.',
          '[\u001b[0;32m  OK  \u001b[0m] Listening on triggerhappy.socket.',
          '[\u001b[0;32m  OK  \u001b[0m] Started Daily Cleanup of Temporary Directories.',
          '[\u001b[0;32m  OK  \u001b[0m] Listening on Avahi mDNS/DNS-SD Stack Activation Socket.',
          '[\u001b[0;32m  OK  \u001b[0m] Listening on D-Bus System Message Bus Socket.',
          '[\u001b[0;32m  OK  \u001b[0m] Started Daily apt download activities.',
          '[\u001b[0;32m  OK  \u001b[0m] Started Daily apt upgrade and clean activities.',
          '[\u001b[0;32m  OK  \u001b[0m] Reached target Timers.',
          '         Starting Docker Socket for the API.',
          '[\u001b[0;32m  OK  \u001b[0m] Listening on Docker Socket for the API.',
          '[\u001b[0;32m  OK  \u001b[0m] Reached target Sockets.',
          '[\u001b[0;32m  OK  \u001b[0m] Reached target Basic System.',
          '         Starting System Logging Service...\', ',
          '         Starting Configure Bluetooth Modems connected by UART...',
          '         Starting Avahi mDNS/DNS-SD Stack...',
          '         Starting Internet superserver...',
          '[\u001b[0;32m  OK  \u001b[0m] Started D-Bus System Message Bus.',
          '[\u001b[0;32m  OK  \u001b[0m] Started Avahi mDNS/DNS-SD Stack.',
          '         Starting WPA supplicant...',
          '         Starting dhcpcd on all interfaces...',
          '         Starting Disable WiFi if country not set...',
          '[\u001b[0;32m  OK  \u001b[0m] Started Regular background program processing daemon.',
          '         Starting Save/Restore Sound Card State...',
          '[\u001b[0;32m  OK  \u001b[0m] Started RPC bind portmap service.',
          '[\u001b[0;32m  OK  \u001b[0m] Started Internet superserver.',
          '[\u001b[0;32m  OK  \u001b[0m] Started triggerhappy global hotkey daemon.',
          '[\u001b[0;32m  OK  \u001b[0m] Started System Logging Service.',
          '[\u001b[0;32m  OK  \u001b[0m] Started Disable WiFi if country not set.',
          '[\u001b[0;32m  OK  \u001b[0m] Started Save/Restore Sound Card State.',
          '[\u001b[0;1;31mFAILED\u001b[0m] Failed to start dhcpcd on all interfaces.',
          'See \'systemctl status dhcpcd.service\' for details.',
          '         Starting Load/Save RF Kill Switch Status...',
          '[\u001b[0;32m  OK  \u001b[0m] Reached target RPC Port Mapper.',
          '[\u001b[0;32m  OK  \u001b[0m] Reached target Remote File Systems (Pre).',
          '[\u001b[0;32m  OK  \u001b[0m] Reached target Remote File Systems.',
          '         Starting LSB: Autogenerate and use a swap file...',
          '         Starting LSB: Switch to ondemand cpu…or (unless shift key is pressed)...',
          '[\u001b[0;32m  OK  \u001b[0m] Found device /sys/subsystem/net/devices/wlan0.',
          '[\u001b[0;32m  OK  \u001b[0m] Started Login Service.',
          '[\u001b[0;32m  OK  \u001b[0m] Started ifup for wlan0.',
          '[\u001b[0;32m  OK  \u001b[0m] Started Load/Save RF Kill Switch Status.',
          '[\u001b[0;32m  OK  \u001b[0m] Started WPA supplicant.',
          '[\u001b[0;32m  OK  \u001b[0m] Started LSB: Switch to ondemand cpu …rnor (unless shift key is pressed).',
          '[\u001b[0;32m  OK  \u001b[0m] Started LSB: Autogenerate and use a swap file.',
          '         Starting Load/Save RF Kill Switch Status...',
          '[\u001b[0;32m  OK  \u001b[0m] Started Configure Bluetooth Modems connected by UART.',
          '[\u001b[0;32m  OK  \u001b[0m] Started Load/Save RF Kill Switch Status.',
          '[\u001b[0;32m  OK  \u001b[0m] Created slice system-bthelper.slice.',
          '         Starting Bluetooth service...',
          '[\u001b[0;1;31m*\u001b[0m\u001b[0;31m*    \u001b[0m] (2 of 2) A start job is running ' +
          'for … network interfaces (32s / 5min 2s)',
          '\u001b[K[\u001b[0m\u001b[0;31m*     \u001b[0m] (2 of 2) A start job is running for … network ' +
          'interfaces (32s / 5min 2s)',
          '\u001b[K[\u001b[0;1;31m*\u001b[0m\u001b[0;31m*    \u001b[0m] (2 of 2) A start job is running ' +
          'for … network interfaces (33s / 5min 2s)',
          '\u001b[K[\u001b[0;31m*\u001b[0;1;31m*\u001b[0m\u001b[0;31m*   \u001b[0m] (1 of 2) A start job ' +
          'is running for Bluetooth service (11s / 1min 30s)',
          '\u001b[K[ \u001b[0;31m*\u001b[0;1;31m*\u001b[0m\u001b[0;31m*  \u001b[0m] (1 of 2) A start job ' +
          'is running for Bluetooth service (12s / 1min 30s)',
          '\u001b[K[  \u001b[0;31m*\u001b[0;1;31m*\u001b[0m\u001b[0;31m* \u001b[0m] (1 of 2) A start job ' +
          'is running for Bluetooth service (12s / 1min 30s)'
        ];
        from(responseArr)
          .pipe(
            concatMap(val => of(val).pipe(delay(100))),
          )
          .subscribe(
            r => prompt.appendAnsiResponse(r),
            () => {
            },
            () => prompt.responseComplete());
        break;

      default:
        prompt.response = 'unknown command';
        prompt.responseComplete();
    }
  }
}
