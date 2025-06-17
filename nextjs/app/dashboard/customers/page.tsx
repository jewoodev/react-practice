import {getCustomers} from '@/app/actions/dashboard'


export default async function CustomersPage() {
    const { errors, data } = await getCustomers()
    if (errors) {
        return <p>{errors}</p>
    } else {
        return <p>{data}</p>
    }
}