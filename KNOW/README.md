# KNOW/ — Base de Conhecimento (split por marca)

A base de conhecimento é **separada por marca**. Padrinho é o hub; **CTBM** e **FER (Família em Reconstrução)** são spokes — cada um parceiro do Padrinho, **nunca entre si**.

```
KNOW/
├── README.md
│
├── Padrinho/ ................. marca Padrinho (hub) — guarda também o dado COMPARTILHADO
│   ├── KNOW_MarketIntel.md ... MERCADO / inteligência (SoT compartilhado; spokes referenciam ../Padrinho/)
│   ├── KNOW_*.md ............. canônico (brand, pilares, personas, produto)
│   └── raw-data/ ............. originais crus (quando houver)
│
├── CTBM/ ..................... marca CTBM (Bezerra de Menezes)
│   ├── KNOW_CTBM_*.md ........ canônico = estratégia + conteúdo-fonte transcrito (PetTerapia, EngajamentoFamilia…)
│   └── raw-data/ ............. APENAS os originais crus da CTBM (PDFs + .txt)
│
└── FER/ ..................... marca Família em Reconstrução (a estruturar)
    ├── KNOW_FER_*.md ........ canônico (a criar na fase de estratégia)
    └── raw-data/ ............ originais crus da FER (PDFs), quando houver
```

## Convenções

- **Cada marca** (Padrinho, CTBM, FER) tem sua **própria pasta** com:
  - **Canônico** na raiz da pasta: `KNOW_<MARCA>_*.md` — inclui tanto a **estratégia interpretada** quanto o **conteúdo-fonte transcrito verbatim** (ex.: `KNOW_CTBM_PetTerapia.md`).
  - **`raw-data/`**: **apenas os originais crus** que a marca nos envia (PDFs + `.txt`). As transcrições verbatim NÃO ficam aqui — são canônicas. Ver `<MARCA>/raw-data/README.md`.
- **Mercado / inteligência** (`KNOW/Padrinho/KNOW_MarketIntel.md`) é o **dado compartilhado** (SoT) — vive na pasta do hub (Padrinho); CTBM/FER o referenciam via `../Padrinho/KNOW_MarketIntel.md`.
- **Não misturar marcas:** copy e vocabulário não se reaproveitam entre Padrinho/CTBM/FER (ver os avisos de marca-separada nos `KNOW_CTBM_*`).

## Fonte da lógica por marca
- Padrinho → `POSTS/Padrinho/STRATEGY_Padrinho.md`
- CTBM → `POSTS/CTBM/STRATEGY_CTBM.md`
- FER → `POSTS/FER/STRATEGY_FER.md` *(a criar)*
