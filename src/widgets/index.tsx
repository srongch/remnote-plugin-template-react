import { declareIndexPlugin, ReactRNPlugin, WidgetLocation } from '@remnote/plugin-sdk';
import '../style.css';
import '../App.css';

async function onActivate(plugin: ReactRNPlugin) {
  await plugin.app.registerWidget('audio_manager_widget', WidgetLocation.TopBar, {
    dimensions: { height: 'auto', width: '100%' },
    widgetTabIcon: '🎧',
    widgetTabTitle: 'Manage Audio',
  });
  await plugin.app.registerWidget(
    'text_widget',
    WidgetLocation.SelectedTextMenu,
    {
      dimensions: {
        height: 'auto',
        width: '100%',
      },
      widgetTabIcon: 'https://cdn-icons-png.flaticon.com/512/2069/2069571.png',
      widgetTabTitle: 'Dictionary',
    },
  );
  // Register a sidebar widget.
  await plugin.app.registerWidget('sample_widget', WidgetLocation.RightSidebar, {
    dimensions: { height: 'auto', width: '100%' },
  });
}

async function onDeactivate(_: ReactRNPlugin) { }

declareIndexPlugin(onActivate, onDeactivate);
