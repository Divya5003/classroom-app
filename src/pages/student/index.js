import Classes from '@/components/Classes'
import Navbar from '@/components/Navbar'
import { getToken } from '@/utils/sessions';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
    const router = useRouter();
    const username = getToken();
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!username) {
                router.push('/login');
            } else {
                getClasses(username);
            }
        };

        const getClasses = async (username) => {
            try {

                const response = await axios.post('https://wsfda4sktc.execute-api.eu-west-2.amazonaws.com/v1/get-classes', {
                    "username": username
                });
                setClasses(response.data.body.classes);
                console.log(response.data.body.classes);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [router]);

    return (
        <>
            <Navbar />
            <div className='main m-10 grid grid-cols-4 gap-4'>
                {classes?.map((classItem) => (
                    <Classes
                        key={classItem.class_code}
                        subject={classItem.name}
                        code={classItem.class_code}
                    />
                ))}
                <Classes
                    subject={"Physics"}
                    code={"B3AFC9"}
                />
                <Classes
                    subject={"Chemistry"}
                    code={"H2AOX0"}
                />
                <Classes
                    subject={"Mathematics"}
                    code={"Y0ABB8"}
                />
            </div>

        </>
    )
}

export default Dashboard