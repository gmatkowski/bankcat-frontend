import { extend, localize  } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import pl from 'vee-validate/dist/locale/pl.json';

localize({
  pl
});

Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule], // copies rule configuration
    message: pl.messages[rule] // assign message
  });
});
