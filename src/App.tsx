import i18n from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';

const App: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <h2>{t('message.hello')}</h2>
      <h2>{t('message.hello')}</h2>
    </>
  );
};

export default App;
