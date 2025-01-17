CREATE DATABASE NutriTrack;
#usar base de datos
USE NutriTrack;

CREATE TABLE paciente(
	id_paciente INT not null auto_increment PRIMARY KEY,
    name varchar(100), 
	email varchar(100),
    password varchar(100),
    sex char(10),
    age int,
    weight DECIMAL(10,1),
    height DECIMAL(10,2),
    goal varchar(500),
    physicalFreq varchar(100)
);


CREATE TABLE dieta(
	id_dieta varchar (4) NOT NULL PRIMARY KEY,
	t_proteinas DECIMAL(10,1),
    t_gmgP char (2),
	t_carbohidratos DECIMAL(10,1),
    t_gmgCar char (2),
	t_grasas DECIMAL(10,1),
    t_gmgGra char (2),
	t_Kcalorias DECIMAL(10,1)
);


CREATE TABLE alimentos(
	id_alimento varchar (50) PRIMARY KEY,
	nameAlimento varchar (100),
    cantidadPorcion varchar (5),
	proteinas DECIMAL(10,1),
    gmgP char (2),
	carbohidratos DECIMAL(10,1),
    gmgCar char (2),
	grasas DECIMAL(10,1),
    gmgGra char (2),
	calorias DECIMAL(10,1),
	glucosa DECIMAL(10,1),
    gmgGlu char (2),
	sodio DECIMAL(10,1),
    gmgSod char (2)
);



CREATE TABLE comidasDia(
	id_comida varchar (4) PRIMARY KEY,
	id_paciente int,
	id_dieta varchar (4),
	type varchar (100),
    FOREIGN KEY (id_paciente) REFERENCES paciente(id_paciente),
    FOREIGN KEY (id_dieta) REFERENCES dieta(id_dieta)
);

CREATE TABLE alimentoDieta(
	id_alimento varchar (4),
	id_dieta varchar (4),
	FOREIGN KEY (id_alimento) REFERENCES alimentos(id_alimento),
    FOREIGN KEY (id_dieta) REFERENCES dieta(id_dieta)
);


#login
select * from paciente where id_paciente = '95';
select email, password from paciente;
select email, password from paciente where email like 'b%' AND password like 'a%';

#registro
#INSERT INTO paciente (id_paciente, name, email, password, sex, age, weight, height, goal, physicalFreq) values

#forgot password
select name from paciente where name like 'j%';


#dieta

SELECT alimentos.nameAlimento, alimentos.cantidadPorcion, alimentos.proteinas, alimentos.gmgP, alimentos.carbohidratos, alimentos.gmgCar, alimentos.grasas, alimentos.gmgGra, alimentos.calorias, alimentos.glucosa, alimentos.gmgGlu, alimentos.sodio, alimentos.gmgSod
FROM alimentoDieta
JOIN alimentos ON alimentoDieta.id_alimento = alimentos.id_alimento
WHERE alimentoDieta.id_dieta = 'DIT1';

SELECT 
    d.id_dieta, d.t_proteinas, d.t_gmgP, d.t_carbohidratos, d.t_gmgCar, d.t_grasas, d.t_gmgGra, d.t_Kcalorias,
    a.nameAlimento, a.cantidadPorcion, a.proteinas, a.gmgP, a.carbohidratos, a.gmgCar, a.grasas, a.gmgGra, a.calorias, a.glucosa, a.gmgGlu, a.sodio, a.gmgSod
FROM 
    dieta d
JOIN 
    alimentoDieta ad ON d.id_dieta = ad.id_dieta
JOIN 
    alimentos a ON ad.id_alimento = a.id_alimento
WHERE 
    d.id_dieta = 'DIT1';

DESCRIBE paciente;


#agregar alimento

INSERT INTO alimentoDieta (id_alimento, id_dieta, cantidad)
VALUES (
    'YG10', 
    (SELECT id_dieta FROM comidasDia WHERE id_comida = 'B177'),
    '255 gr'
);

DELETE FROM paciente WHERE id_paciente = 94;

SELECT * FROM paciente WHERE email = 'nataliabmorera29@gmail.com' AND password = 'Ajiaco2932';



INSERT INTO alimentos (id_alimento, nameAlimento, cantidadPorcion, proteinas, gmgP, carbohidratos, gmgCar, grasas, gmgGra, calorias, glucosa, gmgGlu, sodio, gmgSod)
VALUES ('ID_NUEVO', 'Nombre del Alimento', 'Cantidad', 0.0, 'g', 0.0, 'g', 0.0, 'g', 0.0, 0.0, 'mg', 0.0, 'mg');


INSERT INTO alimentoDieta (id_alimento, id_dieta, cantidad)
VALUES ('ID_DEL_ALIMENTO', 'ID_DE_TU_DIETA', 'Cantidad');



#ALIMENTO/TIPO

SELECT a.nameAlimento, cd.type
FROM alimentoDieta ad
JOIN alimentos a ON ad.id_alimento = a.id_alimento
JOIN comidasDia cd ON ad.id_dieta = cd.id_dieta
WHERE cd.id_comida = 'AV06';





#INSERT INTO paciente (id_paciente, name, email, password, sex, age, weight, height, goal, physicalFreq) VALUES

#('91', 'luis Enrrique', 'luigifaz23@gmail.com', 'asd46fg', 'female', '36', '80.0', '1.90', 'perder grasa', 'Actividad Moderada'),
#('92', 'Juanda Mariguas', 'hojagreen69@gmail.com', 'sat6af6', 'female', '52', '50.0', '1.80', 'aumentar grasa', 'Sedentario'),
#('93', 'Miguel Alfredo ', 'bonifazio78@gmail.com', 'agt58e', 'male', '22', '40.0', '1.70', 'mantener peso', 'Actividad Intesa');


#INSERT INTO dieta (id_dieta, t_proteinas, t_gmgP, t_carbohidratos, t_gmgCar, t_grasas, t_gmgGra, t_Kcalorias) VALUES

#('DIT1', '150.5', 'g', '400', 'g', '83.6', 'g', '3011.5'),
#('DIT2', '151.5', 'g', '481', 'g', '55.6', 'g', '3011.5'),
#('DIT3', '152.5', 'g', '325', 'g', '17.6', 'g', '3011.5'),
#('DIT4', '153.5', 'g', '410', 'g', '40.6', 'g', '3011.5');



#INSERT INTO alimentos (id_alimento, nameAlimento, cantidadPorcion, proteinas, gmgP, carbohidratos, gmgCar, grasas, gmgGra, calorias, glucosa, gmgGlu, sodio, gmgSod) VALUES
#('CE01', 'Cereza', '100g', '1', 'g', '12', 'g', '0.3', 'g', '50', '8', 'g', '3', 'mg'),
#('MA02', 'Manzana', '100g', '0.3', 'g', '14', 'g', '0.2', 'g', '52', '10', 'g', '1', 'mg'),
#('PO03', 'Pollo', '100g', '27', 'g', '0', 'g', '14', 'g', '239', '0', 'g', '82', 'mg'),
#('HU04', 'Huevo', '100g', '13', 'g', '1.1', 'g', '11', 'g', '155', '1.1', 'g', '124', 'mg'),
#('AT05', 'Atun', '100g', '29', 'g', '0', 'g', '0.6', 'g', '130', '0', 'g', '54', 'mg'),
#('AV06', 'Avena', '100g', '13', 'g', '67.7', 'g', '6.5', 'g', '379', '0', 'g', '6', 'mg'),
#('QU07', 'Queso', '100g', '25', 'g', '1.3', 'g', '33', 'g', '402', '0.5', 'g', '621', 'mg'),
#('LT08', 'Leche Entera', '250ml', '6.8', 'g', '7.8', 'g', '5', 'g', '100', '12', 'g', '122', 'mg'),
#('LD09', 'Leche Deslactosada', '100g', '7', 'g', '10', 'g', '3.5', 'g', '100', '12', 'g', '102', 'mg'),
#('YG10', 'Yogurt Griego', '240g', '23.3', 'g', '8.9', 'g', '5.9', 'g', '183', '0.5', 'g', '70', 'mg'),
#('AL11', 'Almendras', '100g', '21', 'g', '22', 'g', '49', 'g', '576', '3.9', 'g', '1', 'mg'),
#('AG12', 'Aguacate', '100g', '2', 'g', '8.5', 'g', '14.6', 'g', '160', '0.6', 'g', '7', 'mg'),
#('CR13', 'Carne de res', '100g', '29', 'g', '0', 'g', '0.6', 'g', '288', '0', 'g', '54', 'mg'),
#('AR14', 'Arroz', '100g', '2.7', 'g', '28', 'g', '0.3', 'g', '130', '0.1', 'g', '1', 'mg'),
#('PI15', 'Piña', '100g', '0.5'g', '13.1', 'g', '0.1', 'g', '50', '9.8', 'g', '1', 'mg');



#INSERT INTO comidasDia (id_comida, id_paciente, id_dieta, type) VALUES
#('B177', '91', 'DIT1', 'Breakfast'),
#('L178', '92', 'DIT2', 'Lunch'),
#('S179', '93', 'DIT3', 'Dinner'),
#('D180', '93', 'DIT4', 'Snack');



#INSERT INTO alimentodieta (id_alimento, id_dieta, cantidad) VALUES
#('AG12', 'DIT1', '250 gr'),
#('AL11', 'DIT3', '20 gr'),
#('AR14', 'DIT1', '250 gr'),
#('AT05', 'DIT3', '120 gr'),
#('AV06', 'DIT1', '150 gr'),
#('PO03', 'DIT1', '85 gr');




####################################################################################################


INSERT INTO alimentos (id_alimento, nameAlimento, cantidadPorcion, proteinas, gmgP, carbohidratos, gmgCar, grasas, gmgGra, calorias, glucosa, gmgGlu, sodio, gmgSod) VALUES

('TO16', 'Tomate', '100g', '0.8', 'g', '3.8', 'g', '0.2', 'g', '18', '2.6', 'g', '5', 'mg'),
('LE17', 'Lechuga', '100g', '1.3', 'g', '2.8', 'g', '0.1', 'g', '15', '0.7', 'g', '28', 'mg'),
('LT18', 'Lentejas', '100g', '25', 'g', '60', 'g', '1.1', 'g', '353', '2', 'g', '6', 'mg'),
('FR19', 'Frijoles', '100g', '21.9', 'g', '62.4', 'g', '1.2', 'g', '346', '2', 'g', '6', 'mg'),
('AL20', 'Alberja', '100g', '5', 'g', '14.5', 'g', '0.4', 'g', '84', '5.7', 'g', '3', 'mg'),
('GA21', 'Garbanzo', '100g', '19', 'g', '61', 'g', '6', 'g', '364', '11', 'g', '24', 'mg'),    
('ZA22', 'Zanahoria', '100g', '0.9', 'g', '9.5', 'g', '0.2', 'g', '41', '4.7', 'g', '69', 'mg'),
('PA23', 'Papa', '100g', '1.8', 'g', '20.1', 'g', '0.1', 'g', '87', '0.9', 'g', '6', 'mg'),
('AR24', 'Arepa', '100g', '5', 'g', '27', 'g', '1.2', 'g', '150', '0.5', 'g', '5', 'mg'),
('PN25', 'Pan Integral', '100g', '8.4', 'g', '43.3', 'g', '3.2', 'g', '247', '5.1', 'g', '400', 'mg'),
('PA26', 'Pastas', '100g', '12', 'g', '71', 'g', '1', 'g', '350', '3', 'g', '5', 'mg'),
('PO27', 'Platano', '100g', '1.1', 'g', '22.8', 'g', '0.3', 'g', '89', '12.2', 'g', '1', 'mg'),
('ES28', 'Espinaca', '100g', '2.9', 'g', '3.6', 'g', '0.4', 'g', '23', '0.4', 'g', '79', 'mg'),
('FR29', 'Fresas', '100g', '0.8', 'g', '7.7', 'g', '0.3', 'g', '32', '4.9', 'g', '1', 'mg'),
('BR30', 'Brocoli', '100g', '2.8', 'g', '6.6', 'g', '0.4', 'g', '34', '1.7', 'g', '33', 'mg'),
('QU31', 'Quinoa', '100g', '4.1', 'g', '21.3', 'g', '1.9', 'g', '120', '0.9', 'g', '7', 'mg'),
('CE32', 'Cebada', '100g', '2.3', 'g', '28.2', 'g', '0.9', 'g', '123', '0.8', 'g', '3', 'mg'),
('AT33', 'Atun', '100g', '23.6', 'g', '0.0', 'g', '0.8', 'g', '98', '0', 'g', '200', 'mg'),    
('SA34', 'Salmon', '100g', '20.4', 'g', '0.0', 'g', '13.6', 'g', '208', '0', 'g', '50', 'mg'),
('PR35', 'Proteina en polvo', '100g', '80', 'g', '5', 'g', '1', 'g', '370', '3', 'g', '150', 'mg'),
('AC36', 'Aceite de oliva', '100g', '0.0', 'g', '0.0', 'g', '100', 'g', '884', '0', 'g', '0', 'mg'),
('SE37', 'Semillas de chia', '100g', '16.5', 'g', '42.1', 'g', '30.7', 'g', '486', '0', 'g', '16', 'mg'),
('SL38', 'semillas de lino', '100g', '18.3', 'g', '28.9', 'g', '42.2', 'g', '534', '1.5', 'g', '30', 'mg'),
('AG39', 'Agua', '100g', '0.0', 'g', '0.0', 'g', '0', 'g', '0', '0', 'g', '0', 'mg'),
('TE40', 'te verde', '100g', '0.2', 'g', '0.7', 'g', '0.0', 'g', '1', '0', 'g', '5', 'mg'),
('CF41', 'cafe negro', '100g', '0.1', 'g', '0.0', 'g', '0.0', 'g', '2', '0.0', 'g', '5', 'mg'),
('AC42', 'aceite de coco', '100g', '0.0', 'g', '0', 'g', '100', 'g', '862', '0', 'g', '0', 'mg');



