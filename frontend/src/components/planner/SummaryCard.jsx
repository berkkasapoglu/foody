function SummaryCard({ children, title }) {
  return (
    <div className="border border-primary rounded-lg shadow-transparent p-6 ">
      <h3 className="font-bold text-lg mb-3 text-center">{title}</h3>
      <div className="relative">{children}</div>
    </div>
  )
}
export default SummaryCard
