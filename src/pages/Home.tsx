import React, {useState} from 'react';
import Alert from "../components/Alert";
import Button from "../components/Button";
import Label from "../components/Label";
import Title from '../components/Title';
import Logo from "../components/Logo";

const Home = () => {

    const [pseudo, setPseudo] = useState<string>();
    const [adversaire, setAdversaire] = useState<string>("Diyar");

    const [error, setError] = useState<string|boolean>(false)
    const [success, setSuccess] = useState<string|boolean>(false)

    return (
        <>
            <div className="w-full flex flex-col justify-center">
                <div className="mx-auto">
                    <Logo />
                </div>
                <div className="container mx-auto">
                    <div className="flex justify-center">
                        <div className="w-full xl:w-2/4 lg:w-11/12 flex">
                            <div
                                className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                                style={{backgroundImage: `url('https://source.unsplash.com/Mv9hjnEUHR4/600x800')`}}></div>
                            <div className="w-full lg:w-7/12 bg-gray-100 p-5 rounded-lg lg:rounded-l-none">
                                <Title>{ adversaire } vous a invité à jouer au Puissance 4</Title>
                                <Title>Renseignez votre pseudo pour jouer</Title>

                                <div className="mb-4">
                                    <Label htmlFor="pseudo">Pseudo</Label>
                                    <input
                                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="pseudo"
                                        type="text"
                                        placeholder="Pseudo"
                                        onChange={(e) => setPseudo(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-6 text-center">
                                    <Button type="submit">Jouer</Button>
                                </div>
                                <Alert type="error" message={error}/>
                                <Alert type="success" message={success}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
