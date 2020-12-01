import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Descriptions, Drawer, Form, Input, message as sendNotif, Modal, Row, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';

import { IAccountUser } from '../../providers/account';
import api from '../../services/api';
import { Container, FieldRemove, FormField, PageHeader } from './styles';

const convertToDate = (seconds: number) =>
  new Date(seconds * 1000).toLocaleDateString("pt-BR");

const columns = [
  {
    title: "Data",
    dataIndex: "createdAt",
    width: 150,
    render: (record: number) => {
      return convertToDate(record);
    },
  },
  {
    title: "Médico",
    dataIndex: "doctor",
    width: 250,
    render: (record: IAccountUser) => {
      return record.name;
    },
  },
  {
    title: "Paciente",
    dataIndex: "pacient",
    render: (record: IAccountUser) => {
      return record.name;
    },
  },
];

export interface IMedicationData {
  id: string;
  medicationId: number;
  name: string;
  administer: string;
  concentration: string;
}

export interface IPrescriptionsData {
  id: string;
  createdAt: number;
  updatedAt: number;
  medications: IMedicationData[];
  pacient: IAccountUser;
  doctor: IAccountUser;
}

export const Prescriptions: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<IPrescriptionsData[]>([]);
  const [
    renderPrescription,
    setRenderPrescription,
  ] = useState<IPrescriptionsData | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const [form] = Form.useForm();

  const [doctorValue, setDoctorValue] = useState<IAccountUser | null>(null);
  const [doctorOptions, setDoctorOptions] = useState<IAccountUser[]>([]);

  const [patientValue, setPatientValue] = useState<IAccountUser | null>(null);
  const [patientOptions, setPatientOptions] = useState<IAccountUser[]>([]);

  const handleRowClick = (record: IPrescriptionsData) =>
    setRenderPrescription(record);

  const handleCloseModal = () => setRenderPrescription(null);

  const handleOpenDrawer = () => setDrawerVisible(true);

  const handleCloseDrawer = () => setDrawerVisible(false);

  const handleDoctorChange = (value: any) => setDoctorValue(value);

  const handleSearchDoctor = async (value: string) => {
    const { status, data: response } = await api.get(
      `/users?take=100&skip=0&name=${value}&orderKeyword=createdAt&orderBy=DESC`
    );

    if (status === 200) {
      setDoctorOptions(response.data);
    }
  };

  const handlePatientChange = (value: any) => setPatientValue(value);

  const handleSearchPatient = async (value: string) => {
    const { status, data: response } = await api.get(
      `/users?take=100&skip=0&name=${value}&orderKeyword=createdAt&orderBy=DESC`
    );

    if (status === 200) {
      setPatientOptions(response.data);
    }
  };

  const handlePrescription = (values: any) => {
    console.log(values);
  };

  useEffect(() => {
    const loadPrescriptions = async () => {
      const { status, data: response } = await api.get(
        "/prescriptions?take=20&skip=0&orderBy=DESC"
      );

      if (status !== 200) {
        void sendNotif.error(response.message);
      } else {
        setPrescriptions(response.data);
      }
    };

    void loadPrescriptions();
  }, []);

  return (
    <Container>
      <PageHeader>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleOpenDrawer}
        >
          Nova Prescrição
        </Button>
      </PageHeader>

      <Table
        columns={columns}
        dataSource={prescriptions}
        loading={!prescriptions}
        pagination={false}
        scroll={{ y: 240 }}
        onRow={(record) => ({ onClick: () => handleRowClick(record) })}
      />

      <Modal
        title={`Prescrição médica`}
        visible={Boolean(renderPrescription)}
        onOk={handleCloseModal}
        onCancel={handleCloseModal}
        footer={false}
      >
        <Descriptions title="Informações da prescrição">
          <Descriptions.Item label="Nome do paciente" span={3}>
            {renderPrescription?.pacient.name}
          </Descriptions.Item>
          <Descriptions.Item label="Email do paciente" span={3}>
            {renderPrescription?.pacient.email}
          </Descriptions.Item>
          <Descriptions.Item label="Nome do médico responsável" span={3}>
            {renderPrescription?.doctor.name}
          </Descriptions.Item>
          <Descriptions.Item label="Data da prescrição" span={3}>
            {convertToDate(renderPrescription?.createdAt || 0)}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions title="Medicamentos" bordered>
          {renderPrescription?.medications.map((medication) => (
            <Descriptions.Item
              key={medication.id}
              label={medication.name}
              labelStyle={{
                maxWidth: 120,
              }}
              span={3}
            >
              <span>
                <strong>Administraçao:</strong> {medication.administer}
              </span>
              <br />
              <span>
                <strong>Concentração:</strong> {medication.concentration}
              </span>
            </Descriptions.Item>
          ))}
        </Descriptions>
      </Modal>

      <Drawer
        title="Nova Prescrição"
        width={720}
        onClose={handleCloseDrawer}
        visible={drawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button onClick={handleCloseDrawer} style={{ marginRight: 8 }}>
              Cancelar
            </Button>
            <Button onClick={form.submit} type="primary">
              Salvar
            </Button>
          </div>
        }
      >
        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
          onFinish={handlePrescription}
          hideRequiredMark
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="doctor"
                label="Médico"
                rules={[
                  { required: true, message: "É necessário definir um médico" },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Selecione um médico"
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  filterOption={false}
                  onSearch={handleSearchDoctor}
                  notFoundContent={null}
                  onChange={handleDoctorChange}
                >
                  {doctorOptions.map((doctor) => (
                    <Select.Option key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="pacient"
                label="Paciente"
                rules={[
                  {
                    required: true,
                    message: "É necessário definir um paciente",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Selecione um paciente"
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  filterOption={false}
                  onSearch={handleSearchPatient}
                  notFoundContent={null}
                  onChange={handlePatientChange}
                >
                  {patientOptions.map((patient) => (
                    <Select.Option key={patient.id} value={patient.id}>
                      {patient.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.List name="medications">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <FormField>
                    <FieldRemove>
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </FieldRemove>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          {...field}
                          label="Medicamento"
                          name={[field.name, "id"]}
                          fieldKey={[field.fieldKey, "id"]}
                          rules={[
                            {
                              required: true,
                              message: "Você precisa selecionar um medicamento",
                            },
                          ]}
                        >
                          <Input placeholder="Insira um medicamento aqui" />
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item
                          {...field}
                          label="Via de Administraçao"
                          name={[field.name, "last"]}
                          fieldKey={[field.fieldKey, "last"]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          {...field}
                          label="Posologia"
                          name={[field.name, "first"]}
                          fieldKey={[field.fieldKey, "first"]}
                          rules={[
                            { required: true, message: "Missing first name" },
                          ]}
                        >
                          <Input.TextArea rows={3} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </FormField>
                ))}
                <Form.Item
                  style={{
                    margin: "12px 0px",
                  }}
                >
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Adicionar medicamento
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Drawer>
    </Container>
  );
};
