const languages = [
  { id: "sv", title: "Swedish", isDefault: true },
  //   { id: "en", title: "English" },
];

const base = languages.find((item) => item.isDefault)?.id || languages[0].id;
const i18n = {
  languages,
  base,
};

const googleTranslateLanguages = languages.map(({ id, title }) => ({
  id,
  title,
}));

// For v2 studio
// module.exports = {i18n, googleTranslateLanguages}

// For v3 studio
export { i18n, googleTranslateLanguages };
