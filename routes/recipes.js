var recipes = require('../recipes.json');
var router = require('express').Router();

router.get('/step/:id', (req, res) => {
  const { id } = req.params;
  const { elapsedTime = 0 } = req.query;

  const foundId = recipes.find((recipe) => recipe.id === +id);
  if (!foundId) return res.status(400).send('NOT_FOUND');

  let index = 0;
  for (let i = 0; i < foundId.timers.length; i++) {
    const time = foundId.timers[i];
    if (time >= +elapsedTime) {
      index = i;
      break;
    }
  }

  res.status(200).json({ index });
});

module.exports = router;
