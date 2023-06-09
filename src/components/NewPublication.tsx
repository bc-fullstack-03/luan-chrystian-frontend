import React, { ChangeEvent, useState } from 'react'
import { XCircle, Camera } from 'phosphor-react'
import { ButtonProps } from '../types/components/ButtonProps';
import { TextArea } from './TextArea';
import { useAuth } from '../hooks/contexts/authContext'
import { api } from '../services/api';
import { Button } from './Button';
import { useNavigate } from 'react-router';
import { Loading } from './Loading';

export function NewPublication({ close }: ButtonProps) {
    const [inputValue, setInputValue] = useState('')
    const [image, setImage] = useState<File | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { token }: any = useAuth()
    const navigate = useNavigate()

    function handlePhotoUpload(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0]
        setImage(file);

        alert("Foto carregada com sucesso")
    }

    async function handleCreatePublication(event: React.FormEvent) {
        event.preventDefault();
        setIsLoading(true)

        const formData = new FormData();

        formData.append("title", inputValue);

        if (image) {
            formData.append("photo", image);
        }

        const data = await api.post("/publications/new", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setIsLoading(false)
            return res.data
        })

        setIsLoading(false)
        navigate(`/publication?id=${data.id}`)
        alert("Publicação realizada com sucesso")
    }

    return (
        <div className="absolute top-0 inset-0 bg-opacity-80 bg-black">
            <Loading isLoading={isLoading} />

            <div
                className="w-[900px] h-[350px] smallScreen:h-[220px] bg-gray-600 shadow-cyan-300 shadow-md absolute left-[450px] top-[75px] smallScreen:left-[200px] smallScreen:top-[12px] flex flex-col items-center justify-start pt-4 rounded" >

                <form className='flex flex-col gap-2'>

                    <XCircle size={20} onClick={close} className='text-white ml-[830px] cursor-pointer' />

                    <TextArea onChange={(event) => setInputValue(event.target.value)} />

                    <div className='flex gap-2 justify-between items-start'>
                        <label htmlFor="photo">
                            <Camera size={20} className='text-white cursor-pointer' />
                            <input type="file" id='photo' className='hidden' onChange={handlePhotoUpload} />
                        </label>

                        <div className=''>
                            <Button title='Publicar' onClick={handleCreatePublication} />
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}
