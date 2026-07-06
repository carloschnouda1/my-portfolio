interface TechBadgeProps {
  label: string
  /** emerald accent for contributed/team context, cyan (default) elsewhere */
  tone?: 'cyan' | 'emerald'
}

const tones = {
  cyan: 'border-primary-400/25 bg-primary-400/5 text-primary-200/90',
  emerald: 'border-secondary-400/25 bg-secondary-400/5 text-secondary-200/90',
}

const TechBadge = ({ label, tone = 'cyan' }: TechBadgeProps) => {
  return (
    <span
      className={`font-mono text-xs px-2.5 py-1 rounded-md border ${tones[tone]} transition-colors`}
    >
      {label}
    </span>
  )
}

export default TechBadge
