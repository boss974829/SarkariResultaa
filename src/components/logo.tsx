export function Logo({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#b42318" />
      <rect x="3.5" y="3.5" width="57" height="57" rx="11" fill="#ffffff" />
      <g fill="#e10600" transform="translate(5 7) scale(0.58)">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21 12,17.77 5.82,21 7,14.14 2,9.27 8.91,8.26" />
      </g>
      <g fill="#0b8f22" transform="translate(21 7) scale(0.58)">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21 12,17.77 5.82,21 7,14.14 2,9.27 8.91,8.26" />
      </g>
      <g fill="#e6b000" transform="translate(37 7) scale(0.58)">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21 12,17.77 5.82,21 7,14.14 2,9.27 8.91,8.26" />
      </g>
      <text x="32" y="52" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="22" fontWeight="800" fill="#b42318">
        SR
      </text>
    </svg>
  );
}
