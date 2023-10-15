/* eslint-disable no-multi-str */
module.exports = {
  app: {
    title: 'Employee Management',
    subtitle: 'Sprout Exam',
    description: 'Sprout Exam - Front End',
    icon: 'fa-solid fa-earth-americas',
  },
  port: 8080,
  api: {
    protocol: 'http',
    host: '127.0.0.1',
    port: '8000',
    base: 'api',
    endPoints: {
      auth: 'auth',
      employee: 'v1/employee'
    },
  },
  sign: {
    route: '/employees',
    in: true,
    up: true,
  },
  cookie: {
    prefix: 'waos',
  },
  oAuth: {
    google: true,
    apple: true,
  },
  whitelists: {
    users: {
      roles: ['user', 'admin'],
    },
  },
  analytics: {
    posthog: {
      // host: 'ph_instance_address',
      // key: 'ph_project_api_key',
    },
  },
  vuetify: {
    theme: {
      dark: 'auto',
      flat: true,
      rounded: 'rounded-lg',
      maxWidth: '1400px',
      snackbar: {
        status: true,
        methods: ['post', 'put'],
        sucessColor: 'success',
        errorColor: 'error',
      },
      appbar: {
        background: '#2c3e50',
        color: '#FFFFFF',
        opacity: 99,
        scrollBehavior: 'hide',
      },
      navigation: {
        background: '#2c3e50',
        color: '#FFFFFF',
        drawer: {
          floating: true,
          expand: true,
          rail: true,
        },
      },
      themes: {
        light: {
          colors: {
            primary: '#1abc9c',
            secondary: '#EE5A24',
            background: '#f3f3f6',
            surface: '#ffffff',
            error: '#e01f26',
            success: '#119178',
            onPrimary: '#ffffff',
            onSecondary: '#FFFFFF',
            onBackground: '#1d1d1f',
            onSurface: '#1d1d1f',
            onError: '#FFFFFF',
            onSuccess: '#FFFFFF',
          },
        },
        dark: {
          colors: {
            primary: '#1abc9c',
            secondary: '#e67e22',
            background: '#1F1F1F',
            surface: '#282A2E',
            error: '#CF6679',
            success: '#119178',
            onPrimary: '#FFFFFF',
            onSecondary: '#FFFFFF',
            onBackground: '#FFFFFF',
            onSurface: '#FEFEFE',
            onError: '#000000',
            onSuccess: '#000000',
          },
        },
      },
      options: {
        customProperties: true,
      },
    },
    icons: {
      defaultSet: 'fa',
    },
  },
  header: {
    logo: {
      file: '/images/logo.webp',
      width: '120px',
    },
    title: false,
    links: [],
    shortcuts: [],
  },
  home: {
    lightBackground: '/images/light.webp',
    darkBackground: '/images/dark.webp',
  },
  pages: {
    style: {
      section: {
        background: 'background',
      },
      card: {
        background: 'surface',
      },
    },
  },
  footer: {
    links: [],
  },
};
