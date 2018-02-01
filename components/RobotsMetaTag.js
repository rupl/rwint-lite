/**
 * Robots metatag
 * Set by environment variable so can be set to no follow for staging
 */

const robots = process.env.ALLOW_ROBOTS === 'true' ? 'index, follow' : 'noindex, nofollow'

const RobotsMetaTag = () => (
  <meta name='robots' content={robots} />
)
export default RobotsMetaTag
