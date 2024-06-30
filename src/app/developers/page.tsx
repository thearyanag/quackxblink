// app/page.js
import Validator from "@/app/components/Validator"
import Properties from "@/app/components/Properties"

export default function Page() {
  return (
    <div className="flex min-h-screen bg-yellow-50">
      <Validator />
      <Properties />
    </div>
  )
}