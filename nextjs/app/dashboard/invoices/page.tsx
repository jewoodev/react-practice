import {getInvoices} from '@/app/actions/dashboard'

export default async function InvoicesPage() {
    const { errors, data } = await getInvoices()
    if (errors) {
        return <p>{errors}</p>
    } else {
        return <p>{data}</p>
    }
}