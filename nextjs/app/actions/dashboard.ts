'use server'


export async function getDashboard(): Promise< { errors?: string; data?: string }> {
    const response = await fetch('http://localhost:8080/api/dashboard', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (!response.ok) {
        const responseJson = await response.json()
        return { errors: responseJson.message }
    }

    const responseText = await response.text()
    return { data: responseText }
}

export async function getCustomers(): Promise< { errors?: string; data?: string }> {
    const response = await fetch('http://localhost:8080/api/dashboard/customers', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (!response.ok) {
        const responseJson = await response.json()
        return { errors: responseJson.message }
    }

    const responseText = await response.text()
    return { data: responseText }
}

export async function getInvoices(): Promise< { errors?: string; data?: string }> {
    const response = await fetch('http://localhost:8080/api/dashboard/customers', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (!response.ok) {
        const responseJson = await response.json()
        return { errors: responseJson.message }
    }

    const responseText = await response.text()
    return { data: responseText }
}