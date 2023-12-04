const colors = ["#FF0000", "#D49928", "#E1D427", "#13B210", "#2999ce"];let colorIndex = 0;
let selectedElements = 0;
let selectedRows = new Set();

// Evento al confirmar la selección
function confirmarSeleccion(cell, newColorIndex) {
    if (selectTienda.value && selectAno.value) {
        const currentColor = cell.style.backgroundColor;
        const icon = cell.querySelector('i');
        const selectTienda = document.getElementById('selectTienda');
        const selectAno = document.getElementById('selectAno');
        const confirmarSeleccionBtn = document.getElementById('confirmarSeleccion');
        const seleccionMensaje = document.getElementById('seleccionMensaje');
        const miTabla = document.getElementById('mi-tabla');


        // Evento al cargar la página
        document.addEventListener('DOMContentLoaded', function () {
            // Ocultar la tabla y mostrar el mensaje de selección
            miTabla.style.display = 'none';
            seleccionMensaje.style.display = 'block';

            // Habilitar el botón de confirmar
            confirmarSeleccionBtn.disabled = false;
        });

        const row = cell.parentNode;

        row.querySelectorAll('.borde i').forEach((i) => {
            i.style.display = 'none';
        });

        if (currentColor === colors[newColorIndex]) {
            cell.style.backgroundColor = "";
            icon.style.display = 'none';
            selectedElements--;
            selectedRows.delete(row);
        } else {
            resetRowColors(row);
            cell.style.backgroundColor = colors[newColorIndex];
            icon.style.display = 'inline-block';
            if (!selectedRows.has(row)) {
                selectedElements++;
                selectedRows.add(row);
            }
        }
        colorIndex = newColorIndex;

        if (selectedElements === 8) {
            calculateOverallPercentage()
        }
    } else {
        // Mostrar mensaje de error o indicar que ambas selecciones son necesarias
        Swal.fire({
            title: 'Error',
            text: 'Por favor, selecciona tienda y año antes de confirmar.',
            icon: 'error',
            customClass: {
                title: 'my-swal-title',
                text: 'my-swal-text',
            },
        });
    }
}

function resetRowColors(row) {
    const cells = row.querySelectorAll('.borde');
    for (const cell of cells) {
        cell.style.backgroundColor = "";
    }
}


function calculateOverallPercentage() {
    const allRows = document.querySelectorAll('tbody tr');
    let total = 0;
    let selectedCount = 0;

    allRows.forEach((row) => {
        const selectedCells = row.querySelectorAll('.borde');
        selectedCells.forEach((cell) => {
            const currentColor = cell.style.backgroundColor;
            if (currentColor) {
                total += getColorValue(currentColor);
                selectedCount++;
            }
        });
    });

    const overallPercentage = selectedCount === 8 ? total / (8 * 100) : 0;

    const percentageCell = document.getElementById('porcentaje');
    const guardarContainer = document.getElementById('guardar-container');

    if (selectedCount === 8) {
        percentageCell.textContent = (overallPercentage * 100).toFixed(2) + '%';

        // Set background color based on percentage value
        if (overallPercentage >= 0 && overallPercentage <= 0.60) {
            percentageCell.style.backgroundColor = '#FF0000';
        } else if (overallPercentage > 0.60 && overallPercentage <= 0.70) {
            percentageCell.style.backgroundColor = '#D49928';
        } else if (overallPercentage > 0.70 && overallPercentage <= 0.80) {
            percentageCell.style.backgroundColor = '#E1D427';
        } else if (overallPercentage > 0.80 && overallPercentage <= 0.90) {
            percentageCell.style.backgroundColor = '#13B210';
        } else if (overallPercentage > 0.90 && overallPercentage <= 1) {
            percentageCell.style.backgroundColor = '#2999ce';
        }

        guardarContainer.style.display = 'block';
        guardarContainer.classList.add('appear');
    } else {
        percentageCell.textContent = '';
        percentageCell.style.backgroundColor = ''; // Reset background color

        guardarContainer.style.display = 'none';
        guardarContainer.classList.remove('appear');
    }
}

// Function to get color value from color string
function getColorValue(colorString) {
    // You may need to implement this function based on your specific requirements
    // For simplicity, assuming that the color string is in the format "rgb(x, y, z)"
    const rgbArray = colorString.match(/\d+/g).map(Number);
    return rgbArray.reduce((acc, val) => acc + val, 0);
}


function getColorValue(color) {
    switch (color) {
        case "rgb(255, 0, 0)": // #FF0000
            return 0;
        case "rgb(41, 153, 206)": // #2999ce
            return 100;
        case "rgb(19, 178, 16)": // #13B210
            return 75;
        case "rgb(225, 212, 39)":   // #E1D427
            return 50;
        case "rgb(212, 153, 40)": // #D49928
            return 25;
        default:
            return 0;
    }
}

function limpiarSeleccion() {
    if (selectedElements > 0) {
        Swal.fire({
            title: 'Confirmación',
            text: '¿Estás seguro que deseas limpiar la selección?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, limpiar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            customClass: {
                title: 'my-swal-title',
                text: 'my-swal-text',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const selectedRowsArray = Array.from(selectedRows);
                for (const row of selectedRowsArray) {
                    const selectedCells = row.querySelectorAll('.borde');
                    selectedCells.forEach((cell) => {
                        resetCell(cell);
                    });
                }

                selectedRows.clear();
                selectedElements = 0;

                const percentageCell = document.getElementById('porcentaje');
                percentageCell.textContent = '';
                percentageCell.style.backgroundColor = ''; // Reset background color
                document.getElementById('guardar-container').style.display = 'none';
            }
        });
    }
}

function resetCell(cell) {
    cell.style.backgroundColor = "";
    cell.querySelector('i').style.display = 'none';
}

const select = document.getElementById('select');
const tabla = document.getElementById('mi-tabla');
const mensaje = document.getElementById('seleccionMensaje');


select.addEventListener('change', () => {
    if (select.value) {

        tabla.style.display = 'table';
        seleccionMensaje.style.display = 'none'

    } else {

        tabla.style.display = 'none';
    }
});

function limpiarTabla() {
    // Ocultar la tabla y mostrar el mensaje de selección
    tabla.style.display = 'none';
    seleccionMensaje.style.display = 'block';

    // Habilitar el elemento select y restablecer su valor
    select.disabled = false;
    select.selectedIndex = 0;

    // Restablecer el estado de las celdas de la tabla
    const celdas = tabla.querySelectorAll('.borde');
    celdas.forEach((celda) => {
        celda.style.backgroundColor = ''; // Restablecer el color de fondo
        const icono = celda.querySelector('.fas');
        if (icono) {
            icono.style.display = 'none'; // Ocultar el icono de check
        }
    });

    // Restablecer el porcentaje
    document.getElementById('porcentaje').textContent = '';
}


function cancel() {
    if (selectedElements > 0) {
        Swal.fire({
            title: 'Confirmación',
            text: '¿Estás seguro que deseas cancelar?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, cancelar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            customClass: {
                title: 'my-swal-title',
                text: 'my-swal-text',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const selectedRowsArray = Array.from(selectedRows);
                for (const row of selectedRowsArray) {
                    const selectedCells = row.querySelectorAll('.borde');
                    selectedCells.forEach((cell) => {
                        resetCell(cell);
                    });
                }


                selectedRows.clear();
                selectedElements = 0;

                const percentageCell = document.getElementById('porcentaje');
                const selectTienda = document.getElementById('selectTienda');
                const selectAno = document.getElementById('selectAno');
                selectTienda.value = "";
                selectAno.value = "";
                percentageCell.textContent = '';
                document.getElementById('guardar-container').style.display = 'none';
                document.getElementById('porcentaje').textContent = '';
                select.disabled = false;
                select.selectedIndex = 0;
            }
        });
    }
}

function agregarAno() {
    const nuevoAno = prompt("Ingrese el nuevo año:");

    if (nuevoAno) {
        const selectAno = document.getElementById('selectAno');
        const nuevaOpcion = document.createElement('option');
        nuevaOpcion.value = 'nuevoAno';  // Puedes personalizar este valor según tus necesidades
        nuevaOpcion.text = nuevoAno;
        selectAno.add(nuevaOpcion);

        // También puedes seleccionar automáticamente el nuevo año si lo prefieres
        selectAno.value = 'nuevoAno';
    }
}


