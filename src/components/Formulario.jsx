import { useState, useEffect } from "react";
import Error from "./Error";

const Formulario = ({setPacientes, pacientes, paciente, setPaciente}) => {

    //Definir States
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');

    const [error, setError] = useState(false);

    useEffect(()=>{
        if(Object.keys(paciente).length > 0){
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(paciente.fecha);
            setSintomas(paciente.sintomas);
        }
    }, [paciente]);

    const generarId = ()=>{
        const random = Math.random().toString(36).substring(2);
        const fecha = Date.now().toString(36);

        return random + fecha;
    }

    const handleSubmit = e => {
        e.preventDefault();
        
        //Validación de formulario
        const datosPaciente = [nombre, propietario, email, fecha, sintomas];
        if(datosPaciente.includes('')){
            setError(true);
            return;
        }

        setError(false);

        //Objeto de paciente
        const infoPaciente = {
            nombre,
            propietario,
            email,
            fecha,
            sintomas,
        }

        if(paciente.id){
            //Editando el registro
            infoPaciente.id = paciente.id;
            const pacientesActualizado = pacientes.map(pacienteState => pacienteState.id === paciente.id ? infoPaciente : pacienteState);

            setPacientes(pacientesActualizado);
            setPaciente({});
        }
        else{
            //Nuevo registro
            infoPaciente.id = generarId();
            setPacientes([...pacientes, infoPaciente]);
            
        }

        //Reiniciar Formulario
        setNombre('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setSintomas('');
    }

    return (
        <div className="md:w-1/2 lg:w-2/5">
            <h2 
                className="font-black text-3xl text-center">
                    Seguimiento Pacientes
            </h2>

            <p className="text-lg mt-5 text-center mb-10">
                Añade Pacientes y {''}
                <span className="text-indigo-600 font-bold">
                    Administralos
                </span>
            </p>

            <form action="" 
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-3">
                
                { error && (
                    <Error>
                        <p>Todos los campos son obligatorios</p>
                    </Error>
                )}             
                
                <div className="mb-5">
                    <label
                        className="block text-gray-700 uppercase font-bold" 
                        htmlFor="mascota">
                            Mascota
                    </label>
                    <input
                        id="mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                        type="text" 
                        placeholder="Nombre de la Mascota"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                
                <div className="mb-5">
                    <label
                        className="block text-gray-700 uppercase font-bold" 
                        htmlFor="nombre">
                            Propietario
                    </label>
                    <input
                        id="nombre"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                        type="text" 
                        placeholder="Nombre del propietario"
                        value={propietario}
                        onChange={e => setPropietario(e.target.value)}
                    />
                </div>
                
                <div className="mb-5">
                    <label
                        className="block text-gray-700 uppercase font-bold" 
                        htmlFor="email">
                            Email
                    </label>
                    <input
                        id="email"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                        type="email" 
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                
                <div className="mb-5">
                    <label
                        className="block text-gray-700 uppercase font-bold" 
                        htmlFor="alta">
                            Alta
                    </label>
                    <input
                        id="alta"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                        type="date"
                        value={fecha}
                        onChange={e => setFecha(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label
                        className="block text-gray-700 uppercase font-bold" 
                        htmlFor="sintomas">
                            Sintomas
                    </label>
                    <textarea
                        id="sintomas"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                        type="email" 
                        placeholder="Describe los sintomas"
                        value={sintomas}
                        onChange={e => setSintomas(e.target.value)}
                    />
                </div>

                <input 
                    type="submit" 
                    value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'} 
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 transition-all cursor-pointer"
                />
            </form>
        </div>
    )
}

export default Formulario;