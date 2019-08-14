import {Store} from '../store.abstract/store';

export class ComponentSettings {
  public cssSettingsAll: Array<CssSettings> = [];
  public cssSettingsCurrent: CssSettings;
}

export class CssSettings {
  public screenWidth: string;
  public settings: Store;
}
