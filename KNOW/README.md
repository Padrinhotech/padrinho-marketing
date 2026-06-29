# KNOW/ — Base de Conhecimento (split por marca)

A base de conhecimento é **separada por marca**. **Duas marcas:** **Padrinho** (hub) e **CTBM** (spoke, parceiro do Padrinho). O **lado família** (Programa Família em Reconstrução / FER) **não é marca separada** — é uma frente **interna do Padrinho**, então seu conhecimento vive em `KNOW/Padrinho/`.

```
KNOW/
├── README.md
│
├── Padrinho/ ................. marca Padrinho (hub) — paciente + família; guarda também o dado COMPARTILHADO
│   ├── KNOW_MarketIntel.md ... MERCADO / inteligência (SoT compartilhado; CTBM referencia ../Padrinho/)
│   ├── KNOW_*.md ............. canônico (brand, pilares, personas paciente: Rosa/Pedro)
│   ├── KNOW_AnaMaeProtetora.md · KNOW_CaioFilho.md · KNOW_FamiliarCodependente.md ... personas família
│   ├── KNOW_ProgramaFamilia.md ... oferta do lado família (Família em Reconstrução / FER)
│   └── raw-data/ ............. originais crus (quando houver)
│
└── CTBM/ ..................... marca CTBM (Bezerra de Menezes)
    ├── KNOW_CTBM_*.md ........ canônico = estratégia + conteúdo-fonte transcrito (PetTerapia, EngajamentoFamilia…)
    └── raw-data/ ............. APENAS os originais crus da CTBM (PDFs + .txt)
```

## Convenções

- **Cada marca** (Padrinho, CTBM) tem sua **própria pasta** com:
  - **Canônico** na raiz da pasta: `KNOW_*.md` — inclui tanto a **estratégia interpretada** quanto o **conteúdo-fonte transcrito verbatim** (ex.: `KNOW_CTBM_PetTerapia.md`).
  - **`raw-data/`**: **apenas os originais crus** que a marca nos envia (PDFs + `.txt`). As transcrições verbatim NÃO ficam aqui — são canônicas. Ver `<MARCA>/raw-data/README.md`.
- **Mercado / inteligência** (`KNOW/Padrinho/KNOW_MarketIntel.md`) é o **dado compartilhado** (SoT) — vive na pasta do hub (Padrinho); a CTBM o referencia via `../Padrinho/KNOW_MarketIntel.md`.
- **Não misturar marcas:** copy e vocabulário não se reaproveitam entre Padrinho e CTBM (ver os avisos de marca-separada nos `KNOW_CTBM_*`). Dentro do Padrinho, o **lado paciente** e o **lado família** dividem a mesma voz de marca, distinguindo-se por persona, oferta e tom (tag `lado:`).

## Fonte da lógica por marca
- Padrinho (paciente + família) → `POSTS/Padrinho/STRATEGY_Padrinho.md` (lado família em §3.1)
- CTBM → `POSTS/CTBM/STRATEGY_CTBM.md`
