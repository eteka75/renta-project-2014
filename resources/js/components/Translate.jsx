import { useTranslation } from 'react-i18next';
import React, { Children } from 'react'

export default function Translate({children}) {
  const { t, i18n } = useTranslation();
  return (
    <>
    {t(children)}
    </>
  )
}
