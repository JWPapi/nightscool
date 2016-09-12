App.info({
    id: 'ffm.nights',
    name: 'FFM Nights',
    description: 'Your nightlife navigator',
    author: 'Julian Tosun',
    email: 'juliantosun@gmail.com',
    version: '0.2.4'
});

App.setPreference('StatusBarOverlaysWebView', false);
App.setPreference('StatusBarBackgroundColor', '#2f2f31');
App.setPreference('StatusBarStyle', 'lightcontent');



App.icons({
  'iphone_2x': 'AppIcons/ios/res/appicon-60@2x.png',
  'iphone_3x': 'AppIcons/ios/res/appicon-60@3x.png',
  'ipad': 'AppIcons/ios/res/appicon-76.png',
  'ipad_2x': 'AppIcons/ios/res/appicon-76@2x.png',
  'ios_settings': 'AppIcons/ios/res/appicon-Small.png',
  'ios_settings_2x': 'AppIcons/ios/res/appicon-Small@2x.png',
  'ios_settings_3x': 'AppIcons/ios/res/appicon-Small@3x.png',
  'android_mdpi': 'AppIcons/android/res/drawable-mdpi/icon.png',
  'android_hdpi': 'AppIcons/android/res/drawable-hdpi/icon.png',
  'android_xhdpi': 'AppIcons/android/res/drawable-xhdpi/icon.png',
  'android_xxxhdpi': 'AppIcons/android/res/drawable-xxhdpiicon.png'
});

App.launchScreens({
  'iphone5': 'LaunchScreens/ios/res/Default-568h@2x~iphone.png',
  'iphone6': 'LaunchScreens/ios/res/750_1334.png',
  'iphone6p_portrait': 'LaunchScreens/ios/res/Default-Portrait-736h@3x.png',
  'ipad_portrait': 'LaunchScreens/ios/res/Default-Portrait~ipad.png',
  'ipad_portrait_2x': 'LaunchScreens/ios/res/Default-Portrait@2x~ipad.png',
  'android_mdpi_portrait': 'LaunchScreens/android/res-long-port-mdpi/default.png',
  'android_hdpi_portrait': 'LaunchScreens/android/res-long-port-hdpi/default.png',
  'android_xhdpi_portrait': 'LaunchScreens/android/res-long-port-xhdpi/default.png',
  'android_xxhdpi_portrait': 'LaunchScreens/android/res-long-port-xxhdpi/default.png'
});

App.accessRule('https://*.googleapis.com');
App.accessRule('https://graph.facebook.com');
App.accessRule('https://*.fbcdn.net');
App.accessRule('https://*.akamaihd.net');
App.accessRule('https://fonts.gstatic.com');
App.accessRule('https://maps.google.de',{type: 'navigation'})
App.accessRule('http://www.google-analytics.com');
App.accessRule('https://stats.g.doubleclick.net');
App.setPreference('Orientation', 'portrait');
