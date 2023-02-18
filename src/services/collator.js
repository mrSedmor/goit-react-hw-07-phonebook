const collator = new Intl.Collator('en', { sensitivity: 'base' }).compare;

export default collator;
