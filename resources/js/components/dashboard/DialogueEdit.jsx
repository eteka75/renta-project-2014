import React from 'react'
import Modal from '../Modal'
import { Button, CardBody, DialogFooter, Typography } from '@material-tailwind/react'
import Translate from '../Translate'

export default function DeleteDialog({ title, btnText, showFunction, children, closeFunction, submitFunction }) {
    return (
        <>

            <Modal show={showFunction} id="md" maxWidth='sm' onClose={closeFunction} submitFunction>
                <Typography className='text-xl font-bold p-4 border-b'>
                    <Translate>{title ?? "Supression d'enrégistrement"}</Translate></Typography>
                <CardBody>
                    {children}
                </CardBody>
                <DialogFooter className='border-t'>
                    <Button
                        variant="text"
                        color="red"
                        dialog="md"
                        onClick={closeFunction}
                        className="mr-1"
                    >
                        <Translate>Annuler</Translate>
                    </Button>
                    <Button variant="gradient" className="bg-red-600 text-white " onClick={submitFunction}>
                        <Translate>{btnText??"Supprimmer"}</Translate>
                    </Button>
                </DialogFooter>
            </Modal>
        </>
    )
}
