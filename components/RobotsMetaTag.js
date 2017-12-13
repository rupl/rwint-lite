const robots = process.env.ALLOW_ROBOTS === 'true' ? 'index, follow' : 'noindex, nofollow'

const RobotsMetaTag = () => (
  <meta name='robots' content={robots} />
)
export default RobotsMetaTag
