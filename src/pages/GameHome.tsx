import React, {useState} from 'react';
import Alert from "../components/Alert";

const GameHome = () => {

    const [pseudo, setPseudo] = useState<string>();
    const [error, setError] = useState<string|boolean>(false)
    const [success, setSuccess] = useState<string|boolean>(false)
    const [adversaire, setAdversaire] = useState<string>("Diyar");

    return (
        <>
            <div className="w-full flex flex-col justify-center">
                <div style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                    <img src="/logo.png" alt="Logo P4"/>
                </div>
                <div className="container mx-auto">
                    <div className="flex justify-center">
                        <div className="w-full xl:w-2/4 lg:w-11/12 flex">
                            <div
                                className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                                style={{backgroundImage: `url('https://source.unsplash.com/Mv9hjnEUHR4/600x800')`}}
                            ></div>
                            <div className="w-full lg:w-7/12 bg-gray-100 p-5 rounded-lg lg:rounded-l-none">
                                <h3 className="pt-4 pb-8 text-2xl text-center font-bold">{ adversaire } vous a invité à jouer au Puissance 4</h3>
                                <h3 className="pt-4 pb-8 text-2xl text-center font-bold">Renseignez votre pseudo pour jouer</h3>

                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700">
                                        Pseudo
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="pseudo"
                                        type="text"
                                        placeholder="Pseudo"
                                        required
                                        onChange={(e) => setPseudo(e.target.value)}
                                    />
                                </div>
                                <div className="mb-6 text-center">
                                    <button
                                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                        type="submit">
                                        Jouer
                                    </button>
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

export default GameHome;
