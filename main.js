const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

// Gardez une reference globale de l'objet window, si vous ne le faites pas, la fenetre sera
// fermee automatiquement quand l'objet JavaScript sera garbage collected.
let window = null

// Wait until the app is ready
app.once('ready', () => {
  // Create a new window
  window = new BrowserWindow({
    // Don't show the window until it ready, this prevents any white flickering
    show: false,
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: false
    }
  })

  // Load a URL in the window to the local index.html path
  window.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Show window when page is ready
  window.once('ready-to-show', () => {
    window.show();
    // Ouvre les DevTools.
    // window.webContents.openDevTools()
  });

  window.on('closed', () => {
    window = null;
  }
  );
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});