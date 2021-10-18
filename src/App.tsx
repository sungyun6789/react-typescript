import i18n from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        'Welcome to React': 'Welcome to React and react-i18next',
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false,
  },
});

const App: React.FC = () => {
  const { t } = useTranslation();

  return <h2>{t('Welcome to React')}</h2>;
};

export default App;
