import { GlobeAltIcon } from '@heroicons/react/24/outline'
import { lusitana } from '@/app/ui/fonts'

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-black`}
    >
      <GlobeAltIcon className="w-12 h-12 rotate-[15deg]" />
      <p className="text-[44px]">Acme</p>
    </div>
  )
}
