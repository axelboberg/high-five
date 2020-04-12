/**
 * Axel Boberg © 2020
 */

const html = require('choo/html')

const Target = require('../components/target')
const target33 = new Target(),
      target34 = new Target()


module.exports = (state, emit) => {
  return html`
    <div class="View u-background--light">
      <div class="u-position--fixed u-padding--40">
        <a class="Button--primary" href="/">
          Back to experiment
        </a>
      </div>
      <article class="u-width--content u-margin--lr--auto u-color--dark">
        <h1 class="u-padding--40 u-padding--tb--20">About this<br>project <span class="u-display--inline-block u-animation--periodic-wave u-transform-origin--emoji-palm--large">👋</span></h1>
        <p class="u-padding--40 u-padding--tb--10 u-text--semibold">
          I was tasked to explore how I could use my personal circle of influence
          to work towards any of the global goals set by the UN.
          Here's what that has to do with a high-five.
        </p>
        <p class="u-padding--40 u-padding--tb--10">
          Most evenings at 9pm I sit down to watch the news, I’ve done so for a while but
          only recently has a word been arising. Exponentially conquering more and
          more headlines, cities, countries and ultimately lives.
        </p>
        ${target34.render(
          require('../assets/targets/target_3-4.svg'),
          'Target 3.4',
          'Reduce mortality from non-communicable diseases and promote mental health'
        )}
        <p class="u-padding--40 u-padding--tb--10">
          The UN states that mental health is an issue that needs to be promoted.
          And at the very same time the Coronavirus is forcing us to stay separated
          even though it’s widely known that mental health is being positively
          impacted by human connections.
        </p>
        <p class="u-padding--40 u-padding--tb--10">
          As a developer I’ve become accustomed to working from home using various
          digital tools, and even though they all are very productive,
          few are promoting human connections other than talking.
          That’s why I wanted to create a tool, or rather show that it’s
          possible to create a tool that blends technology with human connections.
          Preferably done using a language that most people know without even a single spoken word.
        </p>
        ${target33.render(
          require('../assets/targets/target_3-3.svg'),
          'Target 3.3',
          'Fight communicable diseases'
        )}
        <p class="u-padding--40 u-padding--tb--10">
          Also targeted is the spread of communicable diseases, that is; diseases that spread from person to person.
          The easiest way to achieve this is simply to <a href="https://www.folkhalsomyndigheten.se/the-public-health-agency-of-sweden/communicable-disease-control/protect-yourself-and-others-from-spread-of-infection/" target="_blank" rel="noopener noreferrer">avoid close contact with people who are ill</a>,
          and for this reason people are coming up with new creative ways to greet one another. From touching knees to creating fun dances.
        </p>
        <p class="u-padding--40 u-padding--tb--10">
          …and so the idea was born. Why don’t we do digital high-fives?
        </p>
        <p class="u-padding--40 u-padding--tb--10 u-padding--b--40">
          <a href="https://boberg.io" target="_blank" rel="noopener noreferrer">
            Axel Boberg<br>
            Developer
          </a>
        </p>
      </article>
    </div>
  `
}